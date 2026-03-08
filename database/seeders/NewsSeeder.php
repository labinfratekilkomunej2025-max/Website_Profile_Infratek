<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('news')->insert([
            [
                'title'=> "Kegiatan Pelatihan Jaringan Komputer Dasar 2026",
                'created_by_id'=> 1,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
                'is_public'=> true,
                'image_path'=> '1.jpg',
                'description'=> 'Laboratorium Infratek mengadakan pelatihan jaringan komputer dasar untuk mahasiswa semester awal guna mengenalkan konsep routing dan switching',
            ],
            [
                'title'=> "Kunjungan Industri ke Data Center Surabaya",
                'created_by_id'=> 2,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
                'is_public'=> true,
                'image_path'=>null,
                'description'=> 'Mahasiswa konsentrasi Jaringan Komputer melakukan kunjungan studi ke salah satu Data Center terbesar di Surabaya untuk melihat infrastruktur server',
            ],
            [
                'title'=> "Update Perangkat Keras Laboratorium 2026",
                'created_by_id'=> 2,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
                'is_public'=> false,
                'image_path'=> null,
                'description'=> 'Demi menunjang perkuliahan Sistem Operasi, Laboratorium Infratek kini dilengkapi dengan PC spesifikasi terbaru ryzen series',
            ],
            [
                'title'=> "Open Recruitment Asisten Laboratorium 2026",
                'created_by_id'=> 1,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
                'is_public'=> true,
                'image_path'=>null,
                'description'=> 'Dibuka kesempatan bagi mahasiswa angkatan 2024 dan 2025 untuk bergabung menjadi bagian dari keluarga besar asisten laboratorium Infratek',
            ],
        ]);
        DB::table('news_components')->insert([
            [
                'news_id'=>1,
                'type'=>'text',
                'text_content'=>'Laboratorium Infrastruktur Teknologi (INFRATEK) kembali mengadakan pelatihan rutin tahunan yang ditujukan untuk mahasiswa semester awal Fakultas Ilmu Komputer. Kegiatan ini bertujuan untuk mengenalkan dasar-dasar jaringan komputer sebelum mereka menempuh mata kuliah lanjut.',
                'image_path'=>null,
                'order'=>2,
                'created_by_id'=>1,
                'alt_text'=>null,
            ],
            [
                'news_id'=>1,
                'type'=>'image',
                'text_content'=>null,
                'image_path'=>'2.jpg',
                'order'=>3,
                'created_by_id'=>2,
                'alt_text'=>'Suasana antusias peserta pelatihan saat sesi praktik routing.',
            ],
            [
                'news_id'=>1,
                'type'=>'text',
                'text_content'=>'Dalam pelatihan ini, materi yang disampaikan mencakup pengenalan perangkat keras jaringan seperti Router, Switch, dan Access Point, serta simulasi menggunakan Cisco Packet Tracer. Antusiasme peserta terlihat sangat tinggi, terutama pada sesi hands-on lab.',
                'image_path'=>null,
                'order'=>4,
                'created_by_id'=>2,
                'alt_text'=>null,
            ],
            [
                'news_id'=>1,
                'type'=>'quote',
                'text_content'=>'Kami berharap pelatihan ini bisa menjadi bekal awal yang kuat bagi mahasiswa Fasilkom untuk menjadi Network Engineer handal di masa depan.',
                'image_path'=>null,
                'order'=>5,
                'created_by_id'=>1,
                'alt_text'=>null,
            ],
            [
                'news_id'=>1,
                'type'=>'text',
                'text_content'=>'Kegiatan ditutup dengan sesi foto bersama dan pembagian sertifikat keikutsertaan kepada seluruh peserta yang hadir.',
                'image_path'=>null,
                'order'=>6,
                'created_by_id'=>1,
                'alt_text'=>null,
            ],
        ]);
    }
}
