<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('management_details', function (Blueprint $table) {
            $table->dropColumn('linkedin_link');
            $table->foreignId('position_id')->nullable()->constrained('positions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('management_details', function (Blueprint $table) {
            $table->dropColumn('position_id');
            $table->string('linkedin_link')->nullable();
        });
    }
};
