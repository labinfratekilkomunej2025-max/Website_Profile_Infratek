<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
        public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:divisions,name'],
            'order' => ['required', 'integer'],
        ]);
        Division::create($validated);
        return back()->with('success', 'Division Created Succesfully');
    }
    public function update(Division $division, Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'order' => ['required', 'integer'],
        ]);
        if ($division->name != $validated['name'])
        {
            $division->name = $validated['name'];
        }
        $division->order = $validated['order'];
        $division->save();
        return back()->with('success', 'Division Edited Succesfully');
    }
    public function destroy(Division $division)
    {
        $division->delete();
        return back()->with('success', 'Division Deleted Succesfully');
    }
    public function get_all()
    {
        return Division::all();
    }
}
