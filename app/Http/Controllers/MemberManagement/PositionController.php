<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;

class PositionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:positions,name'],
        ]);
        Position::create($validated);
        return back()->with('success', 'Position Created Succesfully');
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:positions,name'],
            'id' => ['required', 'exists:positions,id'],
        ]);
        $position = Position::find($validated['id']);
        if ($position->name != $validated['name'])
        {
            $position->name = $validated['name'];
            $position->save();
        }
        return back()->with('success', 'Position Edited Succesfully');
    }
    public function destroy(Position $position)
    {
        $position->delete();
        return back()->with('success', 'Position Deleted Succesfully');
    }
    public function get_all()
    {
        return Position::all();
    }
}
