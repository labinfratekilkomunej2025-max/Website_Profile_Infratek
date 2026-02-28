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
            // 1
            [
                'full_name'=> 'Yanuar Nurdiansyah, ST., M.Cs.',
                'photo_path'=> 'yanuar.png', // Use file name only
                'linkedin_link' => 'https://www.linkedin.com',
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            // 2
            ],
            [
                'full_name'=> 'Widya Dwinoto Darmawan, ST',
                'photo_path'=> 'widy.png', // Use file name only
                'linkedin_link' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // BPH
            // 3
            [
                'full_name' => "Anugrah Farel Putra Firdyantara",
                // 'position'=> "Ketua Koordinator Asisten",
                'photo_path'=> null,
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=anugrah+farel+putra+firdyantara",
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 4
            [
                'full_name' => "Ifran Raffi Gunawan",
                // 'position'=> "Sekretaris",
                'photo_path'=> null,
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Ifran+Raffi+Gunawan",
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 5
            [
                'full_name' => "Rizqi Cahyani Putri N.",
                // 'position'=> "Bendahara",
                'photo_path'=> null,
                'linkedin'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // Pengembangan Ilmu
            // 6
            [
                'full_name' => "Muhammad Fairuz Zaki",
                // 'position' = "Ketua Divisi",
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Muhammad+Fairuz+Zaki" ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 7
            [   
                'full_name' => "Monica Putri Perdani",
                // 'position' = "Anggota Divisi",
                'linkedin'=> null ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 8
            [   
                'full_name' => "Aden Alexandria Syaiful P.",
                // 'position' = "Anggota Divisi",
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Aden+Alexandria+Syaiful+Perdana" ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ], 
            // 9
            [
                'full_name' => "Rivat Defryanto",
                // 'position' = "Anggota Divisi",
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Rivat+Defryanto" ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 10
            [   
                'full_name' => "Adrian Rizqynaya Putra",
                // 'position' = "Anggota Divisi",
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Adrian+Rizqynaya+Putra" ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 11
            [   
                'full_name' => "Rangga Pramudya Setiawan",
                // 'position' = "Anggota Divisi",
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Rangga+Pramudya+Setiawan" ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 12
            [   
                'full_name' => "Kiarra Putri Mulya K. W.",
                // 'position' = "Anggota Divisi",
                'linkedin'=> "https://www.linkedin.com/search/results/all/?keywords=Kiarra+Putri+Mulya+Kusuma+Wardani" ,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 13
            [   
                'full_name' => "Faiz Ulfia Sasmita",
                // 'position' = "Anggota Divisi",
                'linkedin'=> null,
                'photo_path'=> null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 14
            [
                'full_name' => "Widya Fitriadi Nugraha",
                // 'position' = "Ketua Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Widya+Fitriadi+Nugraha",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 15
            [
                'full_name' => "Edwin Iqbal Santoso",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Edwin+Iqbal+santoso",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 16
            [
                'full_name' => "Syahrial Rafky",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Syahrial+Rafky",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 17
            [
                'full_name' => "Muhammad Syaifur Rozi",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Muhammad+Syaifur+Rozi",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 18
            [
                'full_name' => "Fajar Ilham Arifiyanto",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Fajar+Ilham+Arifiyanto",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 19
            [
                'full_name' => "Aditya Bayu Pratama",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Aditya+Bayu+Pratama",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 20
            [
                'full_name' => "Bagas Al Akbar Maulana",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Bagas+Al+Akbar+Maulana",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 21
            [
                'full_name' => "Ahmad Zafarell Zouvan D.",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=ahmad+zafarell",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 22
            [
                'full_name' => "Erga Pratama",
                // 'position' = "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Erga+Pratama",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 23
            [
                'full_name'=> "Mukhammad Alyasyi Thobiq",
                // 'position'=> "Ketua Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Mukhamad+Alyasyi+Thobiq",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 24
            [ 
                'full_name'=> "Dina Lu'luul Karimah",
                // 'position'=> "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Dina+Lu%27luul+Karimah",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 25
            [ 
                'full_name'=> "Eggy Tio Wandana",
                // 'position'=> "Anggota Divisi",
                'linkedin' => null ,
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 26
            [ 
                'full_name'=> "Hafidlul Muffid Hidayat",
                // 'position'=> "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Hafidlul+Muffid",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 27
            [ 
                'full_name'=> "Dimas Kurniawan Hariyanto",
                // 'position'=> "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Dimas+Kurniawan+Hariyanto",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 28
            [ 
                'full_name'=> "Randika Putri Sonata",
                // 'position'=> "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Randika+Putri+Sonata",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
            // 29
            [ 
                'full_name'=> "Muh Damar Candra Wibawa",
                // 'position'=> "Anggota Divisi",
                'linkedin' => "https://www.linkedin.com/search/results/all/?keywords=Muh+Damar+Candra+Wibawa",
                'photo_path' => null,
                'created_at'=> Carbon::now(),
                'edited_at'=> Carbon::now(),
            ],
        ]);
    }
}
