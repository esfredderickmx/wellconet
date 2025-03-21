<?php

use App\Enums\UserRole;
use App\Models\Department;
use App\Models\Office;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create('users', function (Blueprint $table) {
			$table->id();
			$table->foreignIdFor(Department::class)->nullable()->constrained()->cascadeOnUpdate()->nullOnDelete();
			$table->foreignIdFor(Office::class)->nullable()->constrained()->cascadeOnUpdate()->nullOnDelete();
			$table->string('google_id')->unique();
			$table->string('name', 150);
			$table->string('email', 256)->unique();
			$table->string('job_position', 100);
			$table->date('birth_date')->nullable();
			$table->text('picture');
			$table->string('password');
			$table->enum('role', UserRole::values())->default(UserRole::COMMON);
			$table->rememberToken();
			$table->timestamp('email_verified_at')->nullable();
			$table->timestamps();
		});

		Schema::create('password_reset_tokens', function (Blueprint $table) {
			$table->string('email')->primary();
			$table->string('token');
			$table->timestamp('created_at')->nullable();
		});

		Schema::create('sessions', function (Blueprint $table) {
			$table->string('id')->primary();
			$table->foreignId('user_id')->nullable()->index();
			$table->string('ip_address', 45)->nullable();
			$table->text('user_agent')->nullable();
			$table->longText('payload');
			$table->integer('last_activity')->index();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists('users');
		Schema::dropIfExists('password_reset_tokens');
		Schema::dropIfExists('sessions');
	}
};
