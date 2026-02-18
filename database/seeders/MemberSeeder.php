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
        DB::table('positions')->insert([
            ['name' => "KEPALA LABORATORIUM",],
            ['name' => "PRANATA LABORATORIUM",],
            ['name' => "KETUA LABORATORIUM",],
            ['name' => "BENDAHARA LABORATORIUM",],
            ['name' => "SEKRETARIS LABORATORIUM",],
            ['name' => "KETUA DIVISI PENGEMBANGAN ILMU LABORATORIUM",],
            ['name' => "ANGGOTA DIVISI PENGEMBANGAN ILMU LABORATORIUM",],
        ]);
        DB::table('members')->insert([
            [
                'full_name'=> 'Yanuar Nurdiansyah, ST., M.Cs.',
                'position_id'=> 1,
                'photo_path'=> '', // Use name only
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Widya Dwinoto Darmawan, ST',
                'position_id'=> 2,
                'photo_path'=> '', // Use name only
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Kediv',
                'position_id'=> 6,
                'photo_path'=> '', // Use name only
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Aggota 1',
                'position_id'=> 7,
                'photo_path'=> '', // Use name only
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            [
                'full_name'=> 'Anggota 2',
                'position_id'=> 7,
                'photo_path'=> '', // Use name only
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
        ]);
    }
}
