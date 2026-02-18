<?php

namespace App\Http\Controllers\MemberManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Position;
use App\Models\Period;
use Inertia\Inertia;
use Inertia\Response;

class ManagementManage extends Controller
{
    public function index_per_pos(Request $request) : Response
    {
        $positions = Position::all();
        $periods = Period::all();
        return Inertia::render('Management/PositionPeriodPage', [
            'positions' => $positions, 
            'periods' => $periods
        ]);
    }

    public function get_all_management_member(){
        $excluded_pos = ["KEPALA LABORATORIUM", "PRANATA LABORATORIUM"];
        $member_pos = Position::has('members')->whereNotIn('name', $excluded_pos)->with(['members', 'members.management_detail'])->get();
        return response()->json(["data"=>$member_pos]);
    }
    public function get_all_period_position(){
        $positions = Position::all();
        $periods = Period::all();
        return response()->json(["positions"=>$positions, "periods" => $periods]);
    }

}
