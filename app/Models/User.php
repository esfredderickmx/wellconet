<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use function is_null;

class User extends Authenticatable {
	use HasFactory, Notifiable;

	protected $fillable = [
		'department_id',
		'office_id',
		'google_id',
		'name',
		'email',
		'office',
		'birth_date',
		'picture',
		'password',
		'role',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	public function getIsProfileCompleteAttribute(): bool {
		return $this->office_id && $this->department_id;
	}

	public function getRoleNameAttribute(): string {
		return UserRole::from($this->role->value)->label();
	}

	protected function casts(): array {
		return [
			'email_verified_at' => 'datetime',
			'birth_date' => 'date',
			'password' => 'hashed',
			'role' => UserRole::class,
		];
	}

	public function office(): BelongsTo {
		return $this->belongsTo(Office::class);
	}

	public function department(): BelongsTo {
		return $this->belongsTo(Department::class);
	}

	public function posts(): HasMany {
		return $this->hasMany(Post::class);
	}
}
