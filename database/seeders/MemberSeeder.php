<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('members')->insert([
            [
                'full_name'=> 'Yanuar Nurdiansyah, ST., M.Cs.',
                'photo_path'=> 'yanuar.png', // Use file name only
                'linkedin_link' => 'https://www.linkedin.com',
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Widya Dwinoto Darmawan, ST',
                'photo_path'=> 'widy.png', // Use file name only
                'linkedin_link' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Kediv',
                'photo_path'=> '', // Use file name only
                'linkedin_link' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Aggota 1',
                'photo_path'=> '', // Use file name only
                'linkedin_link' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Anggota 2',
                'photo_path'=> '', // Use file name only
                'linkedin_link' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
        ]);
    }
}
