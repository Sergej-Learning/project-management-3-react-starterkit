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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('name');
            $table->string('description')->nullable();
            $table->date('start_date')->unique();
            $table->date('due_date')->nullable();
            $table->enum('status',['pending','in_progress','completed'])->default('pending');
            $table->enum('priority',['low','standard','high'])->default('standard');
            $table->string('progress')->default('0');            
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
