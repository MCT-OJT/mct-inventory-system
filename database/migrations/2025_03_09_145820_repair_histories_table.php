<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repair_histories', function (Blueprint $table) {
            $table->id();
            $table->string(column: 'issue_description');
            $table->string(column: 'repair_status');
            $table->string(column: 'repaired_by');
            $table->string(column: 'repair_notes');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_histories');
    }
};
