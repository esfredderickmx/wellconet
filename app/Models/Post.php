<?php

namespace App\Models;

use App\Enums\UserDepartment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model {
  protected $fillable = [
    'user_id',
    'title',
    'body',
    'picture',
    'category',
    'is_sketch',
  ];

  protected function casts(): array {
    return [
      'category' => UserDepartment::class,
      'is_sketch' => 'boolean',
    ];
  }

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }
}
