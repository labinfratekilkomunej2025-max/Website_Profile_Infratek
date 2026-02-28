<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Period;
use App\Models\News;
use App\Models\Gallery;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class GuestController extends Controller
{
    function Home(Request $request)
    {
        $news = News::select(['id', 'title', 'description', 'created_at'])
            ->where('is_public', true)
            ->with(['thumbnail:id,news_id'])
            ->orderByDesc('created_at')
            ->take(3)
            ->get();
        Log::info($news);
        return Inertia::render('Home', [
            'latestNews' => $news,
        ]);
    }
    function Gallery(Request $request){
        $galleries = Gallery::select([
                'id',
                'title',
                'description',
                'created_at',
            ])->where('is_public', true)
            ->orderByDesc('created_at')
            ->paginate(9);
        return Inertia::render('gallery/page', [
            'galleries_payload' => $galleries,
        ]);
    }
    function Contact(Request $request){
        return Inertia::render('contact/page');
    }
    function About()
    {
        $periods = Period::orderBy('title')->get();
        $members = Member::select(['members.id',
                'members.full_name',
                'linkedin_link',
                'instagram_link',
                'd.name as division_name',
                'p.name as position_name'
            ])
            ->join('management_details as md', 'md.member_id', '=', 'members.id')
            ->join('positions as p', 'p.id', '=', 'md.position_id')
            ->join('divisions as d', 'd.id', '=', 'p.division_id')
            ->where('md.period_id', $periods[count($periods) - 1]->id)
            ->orderBy('d.order')
            ->orderBy('p.order')
            ->get();
        $grouped = $members->groupBy(function ($item) {
            return $item->division_name;
        });
        
        return Inertia::render('About', [
            'periods'=>$periods,
            'members_page'=>$grouped,
        ]);
    }
    function GetMembers(Period $period)
    {
        $members = Member::select(['members.id',
                'members.full_name',
                'linkedin_link',
                'instagram_link',
                'd.name as division_name',
                'p.name as position_name'
            ])
            ->join('management_details as md', 'md.member_id', '=', 'members.id')
            ->join('positions as p', 'p.id', '=', 'md.position_id')
            ->join('divisions as d', 'd.id', '=', 'p.division_id')
            ->where('md.period_id', $period->id)
            ->orderBy('d.order')
            ->orderBy('p.order')
            ->get();
        $grouped = $members->groupBy(function ($item) {
            return $item->division_name;
        });
        return response()->json($grouped);
    }
    public function News()
    {
        $is_login = Auth::check();
        if ($is_login){
            $news = News::select(['id', 'title', 'description', 'created_at', 'created_by_id'])
                ->with(['thumbnail:id,news_id', 'creator:id,name'])
                ->orderByDesc('created_at')
                ->paginate(9);
        }else{
            $news = News::select(['id', 'title', 'description', 'created_at', 'created_by_id'])
                ->where('is_public', true)
                ->with(['thumbnail:id,news_id'])
                ->orderByDesc('created_at')
                ->paginate(9);
        }
        
        return Inertia::render('News',[
            'news_payload' => $news,
        ]);
    }
}
