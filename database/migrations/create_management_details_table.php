<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('management_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('members')->onDelete('cascade')->unique();
            $table->string('linkedin_link')->nullable();
            $table->foreignId('period_id')->constrained('periods')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('management_details');
    }
};