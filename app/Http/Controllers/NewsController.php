<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsComponent;
use App\Enums\NewsCompType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function manage(News $news)
    {
        return Inertia::render('Management/NewsManage', [
            'news_payload' => $news->load(['creator:id,name', 'editor:id,name']),
        ]);
    }
    // Membuat news baru
    public function createNews(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'images' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);
        if ($validated['description']==null){
            $validated['description'] = $validated['title'];
        }   
            
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('', 'private_news_images');
        }
        $news = News::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'created_at'=>Carbon::now(),
            'edited_at'=>Carbon::now(),
            'edited_by_id' => Auth::id(),
            'is_public'=>false,
            'image_path'=>$imagePath,
            'created_by_id' => Auth::id(),
        ]);

        return redirect(route('news.manage', $news->id))->with([
            'success' => 'News created successfully',
        ]);
    }

    public function updateNews(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'images' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);
        if ($validated['description']==null){
            $validated['description'] = $validated['title'];
        }
        if ($request->hasFile('image')) {
            if ($news->image_path != null && Storage::disk('private_news_images')->exists($news->image_path)){
                Storage::disk('private_news_images')->delete($news->image_path);
            }
            $news->image_path = $request->file('image')->store('', 'private_news_images');
        }
        $news->title = $validated['title'];
        $news->description = $validated['description'];
        $news->edited_at = Carbon::now();
        $news->edited_by_id = Auth::id();
        $news->save();
        return back()->with([
            'success' => 'News Updated Succesfully',
        ]);
    }

    // Menyimpan komponen baru ke dalam sebuah news
    public function store(Request $request, $newsId)
    {
        $request->validate([
            'type' => 'required|in:image,quote,text',
            'text_content' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
            'order' => 'required|integer',
            'alt_text' => 'nullable|string',
            'images' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $imagePath = null;

        if ($request->type == 'image' && $request->hasFile('image')) {
            $imagePath = $request->file('image')->store('', 'private_news_images');;
        }

        $news = News::findOrFail($newsId);

        $component = NewsComponent::create([
            'news_id' => $news->id,
            'type' => $request->type,
            'text_content' => $request->text_content,
            'image_path' => $imagePath,
            'order' => $request->order,
            'alt_text' => $request->alt_text,
            'created_by_id' => Auth::id(),
        ]);

        return back()->with([
            'success' => 'Component created',
        ]);
    }
    // Update komponen
    public function update(Request $request, NewsComponent $component)
    {

        $request->validate([
            'type' => 'required|in:image,quote,text',
            'text_content' => 'nullable|string',
            'image_path' => 'nullable|string',
            'order' => 'required|integer',
            'alt_text' => 'nullable|string',
            'images' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);
        if ($request->type == 'image' && $request->hasFile('image')) {
            if ($component->image_path != null && Storage::disk('private_news_images')->exists($component->image_path)){
                Storage::disk('private_news_images')->delete($component->image_path);
            }
            $request->image_path = $request->file('image')->store('', 'private_news_images');;
        }

        $component->update([
            'type' => $request->type,
            'text_content' => $request->text_content,
            'image_path' => $request->image_path,
            'order' => $request->order,
            'alt_text' => $request->alt_text,
            'created_by_id' => Auth::id(),
        ]);

        return back()->with([
            'success' => 'Component Updated Succesfully',
        ]);
    }

    // Hapus komponen
    public function deleteComponent(NewsComponent $component)
    {

        $component->delete();
        if ($component->image_path != null && Storage::disk('private_news_images')->exists($component->image_path)) {
            Storage::disk('private_news_images')->delete($component->image_path);
        }
        return back()->with([
            'success' => 'Component Deleted Succesfully'
        ]);
    }

    public function deleteNews(News $news)
    {
        $images = NewsComponent::where([
            ['type', 'image'],
            ['news_id', $news->id]
            ])->get();
        foreach ($images as $image) {
            if ($image->image_path != null && Storage::disk('private_news_images')->exists($image->image_path)) {
                Storage::disk('private_news_images')->delete($image->image_path);
            }
        }
        if ($news->image_path!=null && Storage::disk('private_news_images')->exists($news->image_path)){
            Storage::disk('private_news_images')->delete($news->image_path);
        }
        $news->delete();
        return redirect(route('news'))->with([
            'success' => 'News Deleted Succesfully'
        ]);
    }


    // Memanggil semua komponen news 
    public function viewDetail(Request $request, News $news)
    {
        $is_login = Auth::check();

        if (!$is_login && !$news->is_public) {
            abort(401, 'unauthorized access');
        }

        if ($is_login) {
            $news->load([
                'creator:id,name',
                'news_components'
            ]);
        } else {
            $news->load([
                'news_components'
            ]);
        }

        return Inertia::render('NewsDetail', [
            'news' => $news,
            'prev_link' => $request->query('from'),
        ]);
    }

    public function getTumbnailPublic(News $news)
    {
        if (!$news->is_public&&!Auth::check()){abort(401, 'Unauthorized access.');}
        if ($news->image_path != null && Storage::disk('private_news_images')->exists($news->image_path))
        {
            return Storage::disk('private_news_images')->response($news->image_path);
        }else{
            return redirect('https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found');
        }
    }
    public function getImage(NewsComponent $news_component)
    {
        $is_login = Auth::check();
        if (!$is_login && !$news_component->news->is_public){abort(401, 'Unauthorized access.');}
        if ($news_component->image_path != null && Storage::disk('private_news_images')->exists($news_component->image_path))
        {
            return Storage::disk('private_news_images')->response($news_component->image_path);
        }else{
            return redirect('https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found');
        }
    }
    

    public function getNewsComponents(News $news)
    {
        $is_login = Auth::check();
        if (!$is_login && !$news->is_public){abort(401, 'Unauthorized access.');}
        return response()->json(
            NewsComponent::with('creator:id,name')
                ->where('news_id', $news->id)
                ->orderBy('order')
                ->get()
        );
    }
    public function togglePublish(News $news)
    {
        $news->is_public = !$news->is_public;
        $news->save();
        return back()->with([
            'success' => $news->is_public?'News Published':'News Unpublished',
        ]);
    }
}
