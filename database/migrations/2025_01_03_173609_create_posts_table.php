<?php

use App\Enums\UserDepartment;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('posts', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->constrained()->cascadeOnUpdate()->noActionOnDelete();
      $table->string('title', 100);
      $table->text('body');
      $table->string('picture');
      $table->enum('category', UserDepartment::values());
      $table->boolean('is_sketch')->default(false);
      $table->timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('posts');
  }
};
