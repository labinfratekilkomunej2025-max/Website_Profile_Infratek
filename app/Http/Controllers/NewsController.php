<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsComponent;
use App\Enums\NewsCompType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{

    // Membuat news baru
    public function createNews(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $news = News::create([
            'title' => $request->title,
            'created_by_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'News created successfully',
            'data' => $news
        ]);
    }


    // Menyimpan komponen baru ke dalam sebuah news
    public function store(Request $request, $newsId)
    {
        $request->validate([
            'type' => 'required',
            'text_content' => 'nullable|string',
            'image_path' => 'nullable|string',
            'order' => 'required|integer',
            'alt_text' => 'nullable|string',
        ]);

        $news = News::findOrFail($newsId);

        $component = NewsComponent::create([
            'news_id' => $news->id,
            'type' => $request->type,
            'text_content' => $request->text_content,
            'image_path' => $request->image_path,
            'order' => $request->order,
            'alt_text' => $request->alt_text,
            'created_by_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Component created',
            'data' => $component
        ]);
    }

    // Update komponen
    public function update(Request $request, NewsComponent $id)
    {
        $component = $id;

        $request->validate([
            'type' => 'required',
            'text_content' => 'nullable|string',
            'image_path' => 'nullable|string',
            'order' => 'required|integer',
            'alt_text' => 'nullable|string',
        ]);

        $component->update([
            'type' => $request->type,
            'text_content' => $request->text_content,
            'image_path' => $request->image_path,
            'order' => $request->order,
            'alt_text' => $request->alt_text,
        ]);

        return response()->json([
            'message' => 'Component updated',
            'data' => $component
        ]);
    }

    // Hapus komponen
    public function destroy($id)
    {
        $component = NewsComponent::findOrFail($id);

        $component->delete();

        return response()->json([
            'message' => 'Component deleted'
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

    public function index()
    {
        $news = News::orderBy('created_at', 'desc')->get();
        return view('news.index', compact('news'));
    }

    public function create()
    {
        return view('news.create');
    }

    public function getAllType()
    {
        return ; 
    }

    public function getTumbnailPublic(NewsComponent $news_component)
    {
        if (!$news_component->news->is_public){abort(401, 'Unauthorized access.');}
        if ($news_component->image_path != null && Storage::disk('private_news_images')->exists($news_component->image_path))
        {
            return Storage::disk('private_news_images')->response($news_component->image_path);
        }else{
            return redirect('https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found');
        }
    }
    public function getImage(NewsComponent $news_component)
    {
        if ($news_component->image_path != null && Storage::disk('private_news_images')->exists($news_component->image_path))
        {
            return Storage::disk('private_news_images')->response($news_component->image_path);
        }else{
            return redirect('https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found');
        }
    }

}
