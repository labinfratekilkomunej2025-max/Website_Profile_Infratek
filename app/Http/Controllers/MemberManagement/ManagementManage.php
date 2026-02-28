<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Models\Period;
use App\Models\Division;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ManagementDetail;


class ManagementManage extends Controller
{
    public function index_per_pos(Request $request) : Response
    {
        $positions = Position::all();
        $periods = Period::all();
        $divisions = Division::all();
        return Inertia::render('Management/PositionPeriodPage', [
            'positions' => $positions, 
            'periods' => $periods,
            'divisions' => $divisions,
        ]);
    }

    public function get_all_management_member(){
        $excluded_pos = ["Kepala Laboratorium", "Pranata Laboratorium"];
        $member_pos = Position::has('members')->whereNotIn('name', $excluded_pos)->with(['members', 'members.management_detail'])->get();
        return response()->json(["data"=>$member_pos]);
    }
    public function get_all_period_position(){
        $positions = Position::all();
        $periods = Period::all();
        return response()->json(["positions"=>$positions, "periods" => $periods]);
    }
    public function detail_store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => ['required', 'exists:members,id'],
            'position_id' => ['required', 'exists:positions,id'],
            'period_id' => ['required', 'exists:periods,id'],
        ]);
        ManagementDetail::create($validated);
        return back()->with('success', 'Details has Been Succesfully Created');
    }
    public function detail_update(ManagementDetail $management_detail, Request $request)
    {
        $validated = $request->validate([
            'member_id' => ['required', 'exists:members,id'],
            'position_id' => ['required', 'exists:positions,id'],
            'period_id' => ['required', 'exists:periods,id'],
        ]);
        $management_detail->member_id = $validated['member_id']; 
        $management_detail->position_id = $validated['position_id'];
        $management_detail->period_id = $validated['period_id'];
        $management_detail->save();
        return back()->with('success', 'Details has Been Succesfully Updated');
    }
    public function detail_destroy(ManagementDetail $management_detail,)
    {
        $management_detail->delete();
        return back()->with('success', 'Member Detail Deleted Succesfully');
    }
}
