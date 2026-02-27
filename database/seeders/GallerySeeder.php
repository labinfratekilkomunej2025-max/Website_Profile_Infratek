<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 'title',
        // 'description',
        // 'is_public',
        // 'edited_by_id',
        // 'created_at',
        // 'edited_at',
        DB::table('galleries')->insert([
            [
                "title"=> "Kegiatan Pelatihan",
                "description"=> "Dokumentasi kegiatan pelatihan jarkom",
                "is_public"=> 1,
                'edited_by_id' => 1, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],        
            [
                "title"=> "Kunjungan Industri",
                "description"=> "Kunjungan ke Data Center",
                "is_public"=> 1,
                'edited_by_id' => 2, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Rapat Kerja",
                "description"=> "Rapat kerja pengurus lab",
                "is_public"=> 1,
                'edited_by_id' => 3, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Dokumentasi Lab",
                "description"=> "Suasana praktikum",
                "is_public"=> 1,
                'edited_by_id' => 1, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Internal Meeting",
                "description"=> "Rapat internal (Private)",
                "is_public"=> 0,
                'edited_by_id' => 2,
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Workshop",
                "description"=> "Workshop Mikrotik",
                "is_public"=> 1,
                'edited_by_id' => 2, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Seminar Nasional",
                "description"=> "Seminar teknologi",
                "is_public"=> 1,
                'edited_by_id' => 3, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Lomba Jarkom",
                "description"=> "Lomba jaringan antar mahasiswa",
                "is_public"=> 1,
                'edited_by_id' => 2, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Makrab",
                "description"=> "Malam keakraban anggota",
                "is_public"=> 1,
                'edited_by_id' => 2, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Foto Bersama",
                "description"=> "Foto keluarga besar lab",
                "is_public"=> 1,
                'edited_by_id' => 2, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Arsip Lama",
                "description"=> "Dokumen lama (Private)",
                "is_public"=> 0,
                'edited_by_id' => 1,
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Kegiatan Harian",
                "description"=> "Kegiatan sehari-hari di lab",
                "is_public"=> 1,
                'edited_by_id' => 2, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                "title"=> "Inventaris",
                "description"=> "Pengecekan alat",
                "is_public"=> 1,
                'edited_by_id' => 3, 
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
        ]);
        DB::table('gallery_images')->insert([
            [
                'gallery_id'=>1,
                'uploaded_by_id'=>1,
                'image_path'=>'1.jpg',
            ],
            [
                'gallery_id'=>2,
                'uploaded_by_id'=>1,
                'image_path'=>'2.jpg',
            ],
            [
                'gallery_id'=>3,
                'uploaded_by_id'=>2,
                'image_path'=>'3.jpg',
            ],
            [
                'gallery_id'=>4,
                'uploaded_by_id'=>2,
                'image_path'=>'4.jpg',
            ],
            [
                'gallery_id'=>5,
                'uploaded_by_id'=>2,
                'image_path'=>'5.jpg',
            ],
            [
                'gallery_id'=>6,
                'uploaded_by_id'=>3,
                'image_path'=>'6.jpg',
            ],
            [
                'gallery_id'=>7,
                'uploaded_by_id'=>2,
                'image_path'=>'7.jpg',
            ],
            [
                'gallery_id'=>8,
                'uploaded_by_id'=>1,
                'image_path'=>'8.jpg',
            ],
            [
                'gallery_id'=>9,
                'uploaded_by_id'=>1,
                'image_path'=>'9.jpg',
            ],
            [
                'gallery_id'=>10,
                'uploaded_by_id'=>2,
                'image_path'=>'10.jpg',
            ],
            [
                'gallery_id'=>11,
                'uploaded_by_id'=>1,
                'image_path'=>'11.jpg',
            ],
            [
                'gallery_id'=>12,
                'uploaded_by_id'=>2,
                'image_path'=>'12.jpg',
            ],
            [
                'gallery_id'=>13,
                'uploaded_by_id'=>3,
                'image_path'=>'13.jpg',
            ],
            [
                'gallery_id'=>4,
                'uploaded_by_id'=>2,
                'image_path'=>'43.jpg',
            ],
            [
                'gallery_id'=>4,
                'uploaded_by_id'=>2,
                'image_path'=>'44.jpg',
            ],
        ]);     
    }
}
