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


class MemberManage extends Controller
{
    public function index_member(): Response
    {
        return Inertia::render('Management/MemberPage', [
            'members' => Member::with(['position', 'management_detail', 'management_detail.period'])->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'max:255', 'unique:members,full_name'],
            'position_id' => ['required', 'exists:positions,id'],
            'is_photo_update' => ['required', 'boolean'],
            'photo' => ['required_if:is_photo_update,1', 'file', 'mimes:jpeg,png', 'max:5000'], 
            'is_detail' => ['required', 'boolean'],
            'linkedin_link' => ['required_if:is_detail,1', 'string', 'max:255'],
            'period_id' => ['required_if:is_detail,1', 'exists:periods,id'],
        ]);
        $member = Member::create([
            'full_name' => $validated['full_name'],
            'position_id' => $validated['position_id'],
            'photo_path' => '',
            'created_at' => Carbon::now(),
            'edited_at' => Carbon::now(),
        ]);
        
        if ($validated['is_photo_update']){
            $result = $this::store_photo($validated['photo'], $member->photo_path);
            $member->photo_path = $result;
        }
        
        if($validated['is_detail']){
            $member_detail = ManagementDetail::create([
                'member_id' => $member->id,
                'linkedin_link' => $validated['linkedin_link'],
                'period_id' => $validated['period_id'],
            ]);
        }
        $member->save();
        return back()->with('success', $validated['is_photo_update'] ? 'Position Created Succesfully' : 'Position Created Succesfully. Refresh if The Photo Image not Shown');
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'exists:members,id'],
            'full_name' => ['required', 'max:255'],
            'position_id' => ['required', 'exists:positions,id'],
            'is_photo_update' => ['required', 'boolean'],
            'photo' => ['required_if:is_photo_update,1', 'file', 'mimes:jpeg,png', 'max:5000'], 
            'is_detail' => ['required', 'boolean'],
            'linkedin_link' => ['required_if:is_detail,1', 'string', 'max:255'],
            'period_id' => ['required_if:is_detail,1', 'exists:periods,id'],
        ]);
        $member = Member::find($validated['id']);
        if ($member->full_name!=$validated['full_name']) {
            $is_new_name_exist = Member::where('full_name', $validated['full_name'])->exists();
            if ($is_new_name_exist)
            {
                throw ValidationException::withMessages([
                    'name' => 'The Name Already Exist.',
                ]);
            }else
            {
                $member->full_name=$validated['full_name'];
            }
        }
        $result = "";
        if ($validated['is_photo_update']) ($result = $this::store_photo($validated['photo'], $member->photo_path));
        if ($result != "") ($member->photo_path = $result);
        $member->position_id = $validated['position_id'];
        $member->edited_at = Carbon::now();
        $member_detail = $member->management_detail;
        if($validated['is_detail']){
            if ($member_detail==null){
                $member_detail = ManagementDetail::create([
                    'member_id' => $member->id,
                    'linkedin_link' => $validated['linkedin_link'],
                    'period_id' => $validated['period_id'],
                ]);
            }else{
                $member_detail->linkedin_link = $validated['linkedin_link'];
                $member_detail->period_id = $validated['period_id'];
            }
            $member_detail->save();
        }else{
            if ($member_detail!=null){
                $member_detail->delete();
            }
        }
        $member->save();

        return back()->with('success', $validated['is_photo_update'] ? 'Position Created Succesfully' : 'Position Created Succesfully. Refresh if The Photo Image not Shown');
    }
    public function destroy(Member $member)
    {
        $member->delete();
        return back()->with('success', 'Position Deleted Succesfully');
    }
    public function store_photo($file, $old_path)
    {
        if ($old_path!=null && Storage::disk('member_photos')->exists($old_path)) Storage::disk('member_photos')->delete($old_path);
        $file_path = $file->store('', 'member_photos');
        return $file_path;
    }
    public function photo(Member $member){
        if ($member->photo_path!=null && Storage::disk('member_photos')->exists($member->photo_path)) return Storage::disk('member_photos')->response($member->photo_path);
        else return ;
    }
}
