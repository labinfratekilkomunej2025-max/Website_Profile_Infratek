<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('divisions')->insert([
            [
                'name' => 'Atasan',
                'order' => 1,
            ],
            [
                'name' => 'BPH',
                'order' => 2,
            ],
            [
                'name' => 'Divisi Pengembangan Ilmu',
                'order' => 3,
            ],
            [
                'name' => 'Divisi Penelitian dan Pengabdian',
                'order' => 4,
            ],
            [
                'name' => 'Divisi Media dan Teknologi',
                'order' => 5,
            ],
        ]);
        DB::table('positions')->insert([
            [
                'name' => "Kepala Laboratorium",
                'order' => 1,
                'division_id' => 1,
            ],
            [
                'name' => "Pranata Laboratorium",
                'order' => 2,
                'division_id' => 1,
            ],
            [
                'name' => "Ketua Laboratorium",
                'order' => 1,
                'division_id' => 2,
            ],
            [
                'name' => "Bendahara Laboratorium",
                'order' => 2,
                'division_id' => 2,
            ],
            [
                'name' => "Sekretaris Laboratorium",
                'order' => 3,
                'division_id' => 2,
            ],
            [
                'name' => "Ketua Divisi Pengembangan Ilmu",
                'order' => 1,
                'division_id' => 3,
            ],
            [
                'name' => "Anggota Divisi Pengembangan Ilmu",
                'order' => 2,
                'division_id' => 3,
            ],
            [
                'name' => "Ketua Divisi Penelitian dan Pengabdian",
                'order' => 1,
                'division_id' => 4,
            ],
            [
                'name' => "Anggota Divisi Penelitian dan Pengabdian",
                'order' => 2,
                'division_id' => 4,
            ],
            [
                'name' => "Ketua Divisi Media dan Teknologi",
                'order' => 1,
                'division_id' => 5,
            ],
            [
                'name' => "Anggota Divisi Media dan Teknologi",
                'order' => 2,
                'division_id' => 5,
            ],
        ]);
    }
}
