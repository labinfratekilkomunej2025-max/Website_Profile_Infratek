<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsComponent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function update(Request $request, $id)
    {
        $component = NewsComponent::findOrFail($id);

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
    public function getComponents($id)
    {
        $components = NewsComponent::where('news_id', $id)
            ->orderBy('order')
            ->get();

        return response()->json($components);
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
}
