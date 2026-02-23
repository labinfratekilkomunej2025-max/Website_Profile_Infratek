<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Period;

class PeriodController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255', 'unique:periods,title'],
        ]);
        Period::create($validated);
        return back()->with('success', 'Period Created Succesfully');
    }
    public function update(Period $period, Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);
        if ($period->title != $validated['title'])
        {
            $period->title = $validated['title'];
            $period->save();
        }
        return back()->with('success', 'Period Edited Succesfully');
    }
    public function destroy(Period $period)
    {
        $period->delete();
        return back()->with('success', 'Period Deleted Succesfully');
    }
    public function get_all()
    {
        return Period::all();
    }
}
