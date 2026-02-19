<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class GuestController extends Controller
{
    function Home(Request $request)
    {
        $kepala = Member::whereHas('position', function ($q) {
                        $q->where('name', 'KEPALA LABORATORIUM');
                    })->first();
        $pranata = Member::whereHas('position', function ($q) {
                        $q->where('name', 'PRANATA LABORATORIUM');
                    })->first();
        return Inertia::render('Home', [
            'CurrentPath'=>$request->url(),
            'KepalaPhotoPath'=>route('members.photo', $kepala->id),
            'PranataPhotoPath'=>route('members.photo', $pranata->id),
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
}
