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
                'position_id' => 1,
            ],
            [
                'member_id' => 4,
                'period_id' => 1,
                'position_id' => 3,
            ],
            [
                'member_id' => 5,
                'period_id' => 1,
                'position_id' => 3,
            ],
        ]);
    }
}
