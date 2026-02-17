<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class GalleryController extends Controller
{
    /**
     * Display a listing of galleries.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Query builder
        $query = Gallery::with(['images', 'editor']);

        // Filter by is_public jika ada parameter
        if ($request->has('is_public')) {
            $query->where('is_public', $request->is_public);
        }

        // Untuk public view, hanya tampilkan yang is_public = true
        if ($request->has('public_only') && $request->public_only == true) {
            $query->where('is_public', true);
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $galleries = $query->latest('created_at')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $galleries
        ], 200);
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
            'description' => 'required|string',
            'is_public' => 'boolean',
            // edited_by_id akan diambil dari auth user (nanti setelah auth selesai)
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
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
                'edited_by_id' => Auth::id(), // TODO: ganti dengan auth()->id() setelah auth ready
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gallery created successfully',
                'data' => $gallery->load('images')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create gallery',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified gallery.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $gallery = Gallery::with(['images', 'editor'])->find($id);

        if (!$gallery) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $gallery
        ], 200);
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
            'is_public' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $gallery->update([
                'title' => $request->title ?? $gallery->title,
                'description' => $request->description ?? $gallery->description,
                'is_public' => $request->is_public ?? $gallery->is_public,
                'edited_by_id' => $request->user_id ?? 1, // TODO: ganti dengan auth()->id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Gallery updated successfully',
                'data' => $gallery->fresh()->load('images')
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update gallery',
                'error' => $e->getMessage()
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
            return response()->json([
                'success' => false,
                'message' => 'Gallery not found'
            ], 404);
        }

        try {
            $gallery->is_public = !$gallery->is_public;
            $gallery->save();

            return response()->json([
                'success' => true,
                'message' => $gallery->is_public ? 'Gallery published' : 'Gallery unpublished',
                'data' => [
                    'id' => $gallery->id,
                    'is_public' => $gallery->is_public
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle publish status',
                'error' => $e->getMessage()
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
            return response()->json([
                'success' => false,
                'message' => 'Gallery not found'
            ], 404);
        }

        try {
            DB::beginTransaction();

            // Hapus semua gambar dari storage
            foreach ($gallery->images as $image) {
                Storage::disk('private')->delete($image->image_path);
            }

            // Hapus gallery (cascade delete akan handle gallery_images)
            $gallery->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gallery deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete gallery',
                'error' => $e->getMessage()
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
                'success' => false,
                'message' => 'Gallery not found'
            ], 404);
        }

        // Validasi
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // max 5MB per image
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $uploadedImages = [];

            foreach ($request->file('images') as $image) {
                // TODO: Implementasi save file sesuai petunjuk Adit
                // Sementara ini placeholder, nanti akan diupdate setelah Adit selesai auth
                
                // Contoh structure (akan diupdate):
                // $path = $image->store('/', 'private_gallery_images');
                
                $path = 'placeholder/path/' . $image->getClientOriginalName();

                $galleryImage = GalleryImage::create([
                    'gallery_id' => $galleryId,
                    'uploaded_by_id' => Auth::id(), // TODO: ganti dengan auth()->id()
                    'image_path' => $path
                ]);

                $uploadedImages[] = $galleryImage;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => count($uploadedImages) . ' images uploaded successfully',
                'data' => $uploadedImages
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload images',
                'error' => $e->getMessage()
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
                'success' => false,
                'message' => 'Gallery not found'
            ], 404);
        }

        $image = GalleryImage::where('gallery_id', $galleryId)
                            ->where('id', $imageId)
                            ->first();

        if (!$image) {
            return response()->json([
                'success' => false,
                'message' => 'Image not found in this gallery'
            ], 404);
        }

        try {
            DB::beginTransaction();

            // Hapus file dari storage
            Storage::disk('private')->delete($image->image_path);

            // Hapus record dari database
            $image->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}