<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_id')->constrained('news');
            $table->enum('type', ['text', 'image']);
            $table->text('text_content')->nullable();   // diisi jika type = 'text'
            $table->string('image_path')->nullable();   // diisi jika type = 'image'
            $table->string('alt_text');                 // wajib diisi
            $table->integer('order');
            $table->foreignId('created_by_id')->constrained('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_components');
    }
};