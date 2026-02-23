<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Period;
use App\Models\ManagementDetail;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class GuestController extends Controller
{
    function Home(Request $request)
    {
        return Inertia::render('Home', [
            'CurrentPath'=>$request->url(),
        ]);
    }
    function Gallery(Request $request){
        return Inertia::render('gallery/page', [
            'CurrentPath'=>$request->url(),
        ]);
    }
    function Contact(Request $request){
        return Inertia::render('contact/page', [
            'CurrentPath'=>$request->url(),
        ]);
    }
    function GetMembers(Period $period)
    {
        $details = ManagementDetail::with([
            'member',
            'position.division',
        ])
        ->join('positions', 'positions.id', '=', 'management_details.position_id')
        ->join('divisions', 'divisions.id', '=', 'positions.division_id')
        ->where('period_id', $period->id)
        ->orderBy('divisions.order')    
        ->orderBy('positions.order')   
        ->select('management_details.*')
        ->get();
        $grouped = $details->groupBy(function ($item) {
            return $item->position->division?->name;
        });
        return response()->json(['result' => $grouped]);
    }
}
