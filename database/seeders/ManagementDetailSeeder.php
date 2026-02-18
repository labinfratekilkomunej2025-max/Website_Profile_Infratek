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
                'title' => 'KEPENGURUSAN ANGKATAN 2025/2026',
            ],
        ]);
        $period_id = DB::table('periods')->where('title', 'KEPENGURUSAN ANGKATAN 2025/2026')->first()->id;
        DB::table('management_details')->insert([
            [
                'member_id' => 4,
                'linkedin_link' => 'https://www.linkedin.com',
                'period_id' => $period_id,
            ],
            [
                'member_id' => 5,
                'linkedin_link' => 'https://www.linkedin.com',
                'period_id' => $period_id,
            ],
        ]);
    }
}
