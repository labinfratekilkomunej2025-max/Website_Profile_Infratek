<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'ADMIN',
                'password' => Hash::make('admin123'),
                'remember_token' => null,
                'is_admin' => true,
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
            [
                'name' => 'EDITOR',
                'password' => Hash::make('editor123'),
                'remember_token' => null,
                'is_admin' => false,
                'created_at' => Carbon::now(),
                'edited_at' => Carbon::now(),
            ],
        ]);
    }
}
