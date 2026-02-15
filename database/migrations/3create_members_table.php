<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->foreignId('position_id')->constrained('positions')->onDelete('cascade');
            $table->string('photo_path');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('edited_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};