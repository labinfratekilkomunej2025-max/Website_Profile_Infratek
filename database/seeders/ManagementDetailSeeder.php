<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ManagementDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('periods')->insert([
            [
                'title' => 'Periode 2025/2026',
            ],
        ]);
        DB::table('management_details')->insert([
            [
                'member_id' => 1,
                'period_id' => 1,
                'position_id' => 1,
            ],
            [
                'member_id' => 2,
                'period_id' => 1,
                'position_id' => 2,
            ],
            [
                'member_id' => 3,
                'period_id' => 1,
                'position_id' => 3,
            ],
            [
                'member_id' => 4,
                'period_id' => 1,
                'position_id' => 4,
            ],
            [
                'member_id' => 5,
                'period_id' => 1,
                'position_id' => 5,
            ],
            [
                'member_id' => 6,
                'period_id' => 1,
                'position_id' => 6,
            ],
            [
                'member_id'=>7,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>8,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>9,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>10,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>11,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>12,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>13,
                'period_id'=>1,
                'position_id'=>7,
            ],
            [
                'member_id'=>14,
                'period_id'=>1,
                'position_id'=>8,
            ],
            [
                'member_id'=>15,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>16,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>17,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>18,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>19,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>20,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>21,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>22,
                'period_id'=>1,
                'position_id'=>9,
            ],
            [
                'member_id'=>23,
                'period_id'=>1,
                'position_id'=>10,
            ],
            [
                'member_id'=>24,
                'period_id'=>1,
                'position_id'=>11,
            ],
            [
                'member_id'=>25,
                'period_id'=>1,
                'position_id'=>11,
            ],
            [
                'member_id'=>26,
                'period_id'=>1,
                'position_id'=>11,
            ],
            [
                'member_id'=>27,
                'period_id'=>1,
                'position_id'=>11,
            ],
            [
                'member_id'=>28,
                'period_id'=>1,
                'position_id'=>11,
            ],
            [
                'member_id'=>29,
                'period_id'=>1,
                'position_id'=>11,
            ],
        ]);
    }
}
