<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function get_all_editor(){
        return response()->json([
            "data" => User::where('is_admin', false)->get(),
        ]);
    }
    public function delete_user(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $user = User::find($validated['user_id']);
        $user->delete();

        return back()->with('success', 'User deleted successfully!');
    }
    public function create(Request $request)
    {

    }
    public function update(Request $request)
    {

    }
}
