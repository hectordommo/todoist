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
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('priority')->default(3);
            $table->tinyInteger('effort')->default(1);
            $table->tinyInteger('value')->default(3);
            $table->text('activity');
            $table->text('description')->nullable();
            $table->bigInteger('project_id')->nullable();
            $table->bigInteger('client_id')->nullable();
            $table->bigInteger('goal_id')->nullable();
            $table->date('delivery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
