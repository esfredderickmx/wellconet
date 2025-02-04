<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Storage;
use Str;
use function url;

class Post extends Model {
	use HasFactory;

	protected $fillable = [
		'user_id',
		'title',
		'description',
		'body',
		'picture',
		'is_sketch',
	];

	public function getPictureUrlAttribute(): string {
		if (Str::isUrl($this->picture)) return $this->picture;

		return url(Storage::url($this->picture));
	}

	protected function casts(): array {
		return [
			'is_sketch' => 'boolean',
		];
	}

	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}
}
