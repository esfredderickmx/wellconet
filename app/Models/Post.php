<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model {
  protected $fillable = [
    'user_id',
    'title',
    'body',
    'picture',
    'is_sketch',
  ];

  protected function casts(): array {
    return [
      'is_sketch' => 'boolean',
    ];
  }

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }
}
