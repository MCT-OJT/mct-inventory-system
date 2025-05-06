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
            $table->foreignId('employee_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->string(column: 'serial_number');
            $table->string(column: 'asset_tag');
            $table->string(column: 'status');
            $table->string(column: 'date_acquired');
            $table->string(column: 'deployed_date')->nullable();
            $table->text(column: 'remarks')->nullable();
            $table->foreignId('asset_id')
                ->nullable()
                ->constrained('assets')
                ->cascadeOnDelete();
            $table->foreignId('repair_histories_id')
                ->nullable()
                ->constrained('repair_histories')
                ->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
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
