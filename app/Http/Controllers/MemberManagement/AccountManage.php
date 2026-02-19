<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

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
        $validated = $request->validate([
            'name' => ['required', 'unique:users,name', 'string', 'max:255'],
            'is_admin' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
            'is_change_password' => ['required', 'boolean'],
            'password' => ['required_if:is_change_password,true', 'confirmed', 'nullable', Rules\Password::default()],
        ]);
        $validated['password'] = Hash::make($validated['password']);
        User::create($validated + [
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);
        return back()->with('success', 'Account Created Succesfully');
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'is_admin' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
            'is_change_password' => ['required', 'boolean'],
            'password' => ['required_if:is_change_password,1', 'confirmed', 'nullable', Rules\Password::defaults()],
        ]);
        $member = User::find($validated['id']);
        if ($member->name!=$validated['name']) {
            $is_new_name_exist = User::where('name', $validated['name'])->exists();
            if ($is_new_name_exist)
            {
                throw ValidationException::withMessages([
                    'name' => 'The Name Already Exist.',
                ]);
            }else
            {
                $member->name=$validated['name'];
            }
        }
        $member->name = $validated['name']; 
        $member->is_admin = $validated['is_admin']; 
        $member->password = Hash::make($validated['password']);
        $member->is_active = $validated['is_active']; 
        $member->updated_at = Carbon::now();
        $member->save();
        return back()->with('success', 'Account Changed Succesfully');
    }
}
