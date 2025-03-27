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
        Schema::create('inventory', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users', 'id')
                ->nullOnDelete();
            $table->string(column: 'serial_number');
            $table->string(column: 'asset_tag');
            $table->string(column: 'asset_name');
            $table->string(column: 'asset_type');
            $table->string(column: 'status');
            $table->string(column: 'date_acquired');
            $table->string(column: 'deployed_date')->nullable();
            $table->string(column: 'user_incharge')->nullable();
            $table->text(column: 'remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
