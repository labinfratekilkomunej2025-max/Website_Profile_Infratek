<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Illuminate\Validation\Rules\Password;

class AccountManage extends Controller
{
    public function index(){
        return inertia('Management/AccountPage', [
            'accounts' => User::all()
        ]);
    }
    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User deleted successfully!');
    }
    public function store(Request $request)
    {
        Log::info($request);
        $validated = $request->validate([
            'name' => ['required', 'unique:users,name', 'string', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_admin' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
        ]);
        User::create($validated + [
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);
        return back()->with('success', 'Account Created Succesfully');
    }
    public function update(Request $request)
    {
        Log::info($request);
        return back()->with('success', 'Account Changed Succesfully');
    }
}
