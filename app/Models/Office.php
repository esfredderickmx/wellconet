<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model {
	use HasFactory;

	protected $fillable = [
		'uuid',
		'name',
	];

	protected function casts(): array {
		return [
			'uuid' => 'string',
		];
	}

	public function users(): HasMany {
		return $this->hasMany(User::class);
	}
}
