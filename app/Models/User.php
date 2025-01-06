<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserDepartment;
use App\Enums\UserOffice;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
  use HasFactory, Notifiable;

  protected $fillable = [
    'google_id',
    'name',
    'email',
    'job_position',
    'department',
    'office',
    'picture',
    'password',
    'role',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $appends = [
    'department_name',
    'office_name',
    'is_profile_complete',
    'role_name',
  ];

  public function getDepartmentNameAttribute(): string {
    return UserDepartment::from($this->department->value)->label();
  }

  public function getOfficeNameAttribute(): string {
    return UserOffice::from($this->office->value)->label();
  }

  public function getIsProfileCompleteAttribute(): bool {
    return $this->department !== UserDepartment::UNDEFINED && $this->office !== UserOffice::UNDEFINED;
  }

  public function getRoleNameAttribute(): string {
    return UserRole::from($this->role->value)->label();
  }

  protected function casts(): array {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
      'department' => UserDepartment::class,
      'office' => UserOffice::class,
      'role' => UserRole::class,
    ];
  }
}
