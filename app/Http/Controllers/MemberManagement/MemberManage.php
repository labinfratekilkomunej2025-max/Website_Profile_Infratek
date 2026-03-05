<?php

namespace App\Http\Controllers\MemberManagement;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\ManagementDetail;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;


class MemberManage extends Controller
{
    public function index_member()
    {
        $members = Member::with(['management_detail', 'management_detail.period', 'management_detail.position', 'management_detail.position.division'])
                ->orderBy('full_name')
                ->paginate(10);
        return Inertia::render('Management/MemberPage', [
            'members_payload' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'max:255'],
            'is_photo_update' => ['required', 'boolean'],
            'photo' => ['required_if:is_photo_update,1', 'file', 'mimes:jpeg,png', 'max:5000'], 
            'linkedin_link' => ['nullable', 'string', 'max:255'],
            'instagram_link' => ['nullable', 'string', 'max:255'],
        ]);
        $member = Member::create([
            'full_name' => $validated['full_name'],
            'linkedin_link' => $validated['linkedin_link'],
            'instagram_link' => $validated['instagram_link'],
            'photo_path' => '',
            'created_at' => Carbon::now(),
            'edited_at' => Carbon::now(),
        ]);
        if ($validated['is_photo_update']){
            $result = $this::store_photo($validated['photo'], $member->photo_path);
            $member->photo_path = $result;
        }
        $member->save();
        return back()->with('success', $validated['is_photo_update'] ? 'Position Created Succesfully' : 'Position Created Succesfully. Refresh if The Photo Image not Shown');
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'exists:members,id'],
            'full_name' => ['required', 'max:255'],
            'is_photo_update' => ['required', 'boolean'],
            'photo' => ['required_if:is_photo_update,1', 'file', 'mimes:jpeg,png', 'max:5000'], 
            'linkedin_link' => ['required_if:is_detail,1', 'nullable', 'string', 'max:255'],
            'instagram_link' => ['nullable', 'string', 'max:255'],
        ]);
        $member = Member::find($validated['id']);
        if ($member->full_name!=$validated['full_name']) {
            $is_new_name_exist = Member::where('full_name', $validated['full_name'])->exists();
            if ($is_new_name_exist)
            {
                throw ValidationException::withMessages([
                    'full_name' => 'The Name Already Exist.',
                ]);
            }else
            {
                $member->full_name=$validated['full_name'];
            }
        }
        $member->linkedin_link = $validated['linkedin_link'];
        $member->instagram_link = $validated['instagram_link'];
        if ($validated['is_photo_update']){
            $result = $this::store_photo($validated['photo'], $member->photo_path);
            $member->photo_path = $result;
        }
        $member->edited_at = Carbon::now();
        $member->save();

        return back()->with('success', $validated['is_photo_update'] ? 'Position Created Succesfully' : 'Position Created Succesfully. Refresh if The Photo Image not Shown');
    }
    public function destroy(Member $member)
    {
        $member->delete();
        return back()->with('success', 'Member Deleted Succesfully');
    }
    public function store_photo($file, $old_path)
    {
        if ($old_path!=null && Storage::disk('member_photos')->exists($old_path)) Storage::disk('member_photos')->delete($old_path);
        $file_path = $file->store('', 'member_photos');
        return $file_path;
    }
    public function photo(Member $member){
        if ($member->photo_path!=null && Storage::disk('member_photos')->exists($member->photo_path)) {
            return Storage::disk('member_photos')->response($member->photo_path);
        }else {
            $name = $member->full_name;
            return redirect("https://ui-avatars.com/api/?name=$name&background=random");
        }
    }
}
