<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

class GalleryController extends Controller
{
    private function lastEdited(Gallery $gallery)
    {
        $gallery->edited_by_id = Auth::id();
        $gallery->edited_at=Carbon::now();
        $gallery->save();
    }

    /**
     * Store a newly created gallery.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->with([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Create gallery
            $gallery = Gallery::create([
                'title' => $request->title,
                'description' => $request->description,
                'is_public' => $request->is_public ?? false,
                'edited_by_id' => Auth::id(),
                'created_at'=>Carbon::now(),
            ]);

            DB::commit();

            return redirect(route('galleries.manage', $gallery->id))->with([
                'success' => 'Created Gallery Succesfully',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with([
                'error' => 'Failed to create gallery' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified gallery.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery not found'
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
        ]);

        if ($validator->fails()) {
            return back()->with([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $gallery->update([
                'title' => $request->title ?? $gallery->title,
                'description' => $request->description ?? $gallery->description,
                'edited_by_id' => Auth::id(),
                'edited_at'=>Carbon::now(),
            ]);

            return back()->with([
                'success' => 'Gallery updated successfully',
                'message' => 'Gallery updated successfully',
                'data' => $gallery->fresh()->load('images')
            ], 200);

        } catch (\Exception $e) {
            return back()->with([
                'message' => 'Failed to update gallery',
                'error' =>'Failed to update gallery',
            ], 500);
        }
    }

    /**
     * Toggle is_public status (publish/unpublish).
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function togglePublish($id)
    {
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return back()->with([
                // 'success' => false,
                'error' => 'Gallery not found'
            ], 404);
        }

        try {
            $gallery->is_public = !$gallery->is_public;
            $this::lastEdited($gallery);

            return back()->with([
                'success' => $gallery->is_public ? 'Gallery published' : 'Gallery unpublished',
                // 'message' => $gallery->is_public ? 'Gallery published' : 'Gallery unpublished',
                // 'data' => [
                //     'id' => $gallery->id,
                //     'is_public' => $gallery->is_public
                // ]
            ], 200);

        } catch (\Exception $e) {
            return back()->with([
                'error' => 'Failed to toggle publish status',
                // 'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified gallery.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return back()->with([
                // 'success' => false,
                'error' => 'Gallery not found'
            ], 404);
        }

        try {
            DB::beginTransaction();
            // Hapus semua gambar dari storage
            foreach ($gallery->images as $image) {
                if ($image->image_path != null && Storage::disk('private_gallery_images')->exists($image->image_path)) {
                    Storage::disk('private_gallery_images')->delete($image->image_path);
                }
            }

            // Hapus gallery (cascade delete akan handle gallery_images)
            $gallery->delete();

            DB::commit();
            return redirect(route('gallery'))->with([
                // 'success' => true,
                'success' => 'Gallery deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with([
                // 'success' => false,
                // 'message' => 'Failed to delete gallery',
                'error' => 'Failed to delete gallery'.$e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload multiple images to a gallery.
     * 
     * @param Request $request
     * @param int $galleryId
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImages(Request $request, $galleryId)
    {
        $gallery = Gallery::find($galleryId);

        if (!$gallery) {
            return response()->json([
                // 'success' => false,
                'error' => 'Gallery not found'
            ], 404);
        }

        // Validasi
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // max 5MB per image
        ]);

        if ($validator->fails()) {
            return response()->json([
                // 'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $uploadedImages = [];

            foreach ($request->file('images') as $image) {
                // Store file using Adit's pattern
                $path = $image->store('', 'private_gallery_images');

                $galleryImage = GalleryImage::create([
                    'gallery_id' => $galleryId,
                    'uploaded_by_id' => Auth::id(),
                    'image_path' => $path
                ]);

                // Add image URL, Use Path Instead
                $galleryImage->image_path = $path;
                $galleryImage->save();
                $uploadedImages[] = $galleryImage;
            }
            $this::lastEdited($gallery);
            DB::commit();

            return response()->json([
                // 'success' => true,
                'success' => count($uploadedImages) . ' images uploaded successfully',
                // 'data' => $uploadedImages
                'edited_at' => $gallery->edited_at,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());
            return response()->json([
                // 'success' => false,
                // 'error' => ,
                'error' => 'Failed to upload images' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a specific image from gallery.
     * 
     * @param int $galleryId
     * @param int $imageId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteImage($galleryId, $imageId)
    {
        $gallery = Gallery::find($galleryId);

        if (!$gallery) {
            return response()->json([
                // 'success' => false,
                'error' => 'Gallery not found'
            ], 404);
        }

        $image = GalleryImage::where('gallery_id', $galleryId)
                            ->where('id', $imageId)
                            ->first();

        if (!$image) {
            return response()->json([
                // 'success' => false,
                'error' => 'Image not found in this gallery'
            ], 404);
        }

        try {
            DB::beginTransaction();

            // Hapus file dari storage
            if ($image->image_path != null && Storage::disk('private_gallery_images')->exists($image->image_path)) {
                Storage::disk('private_gallery_images')->delete($image->image_path);
            }

            // Hapus record dari database
            $image->delete();
            $this::lastEdited($gallery);
            DB::commit();

            return response()->json([
                'success' => 'Image deleted successfully',
                'edited_at' => $gallery->edited_at,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to delete image' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Serve gallery image (following Adit's pattern)
     * 
     * @param Gallery $gallery
     * @param GalleryImage $image
     * @return \Symfony\Component\HttpFoundation\StreamedResponse|null
     */
    public function image(Gallery $gallery, GalleryImage $image)
    {
        // Check if image belongs to this gallery
        if ($image->gallery_id !== $gallery->id) {
            abort(404);
        }

        // Serve image if exists
        if ($image->image_path != null && Storage::disk('private_gallery_images')->exists($image->image_path)) {
            return Storage::disk('private_gallery_images')->response($image->image_path);
        }
        
        return null;
    }

    public function image_tumbnail(Gallery $gallery)
    {
        $images = $gallery->images;
        if (count($images)==0){
            return response()->json([
                'error' => 'There is No Image on This Gallery'
            ]);
        }
        $image_path = $images[0]->image_path;
        if (!Storage::disk('private_gallery_images')->exists($image_path)){
            return response()->json([
                'error' => 'Error, File Does Not Exist'
            ]);
        } 
        return Storage::disk('private_gallery_images')->response($image_path);
    }
    public function GetAvailableImage(Gallery $gallery)
    {
        $images = $gallery->images()
            ->select('id')
            ->get()
            ->values();
        if (count($images)==0){
            return response()->json([
                'error' => 'There is No Image on This Gallery'
            ]);
        }
        return response()->json($images);
    }
    public function manage(Gallery $gallery)
    {
        Log::info($gallery->load('editor:id,name'));
        return Inertia::render('Management/GalleryManage', [
            'gallery_payload' => $gallery->load('editor:id,name'),
        ]);
    }
    public function getImagesId(Gallery $gallery)
    {
        $images = $gallery->images()->pluck('id');
        return response()->json($images);
    }
}