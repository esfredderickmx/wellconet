<?php

namespace App\Enums;

use Arr;
use Str;
use function array_column;

enum PublicationType: string {
  case ANNOUNCEMENT = 'announcement';
  case NEWS = 'news';
  case COMMUNICATION = 'communication';
  case POST = 'post';

  public static function options(): array {
    return Arr::map(array_column(self::cases(), 'name'), function (string $name) {
      return ['value' => Str::lower($name), 'label' => self::from(Str::lower($name))->label()];
    });
  }

  public function label(): string {
    return match ($this) {
      self::ANNOUNCEMENT => 'Anuncio',
      self::NEWS => 'Noticia',
      self::COMMUNICATION => 'Comunicación',
      self::POST => 'Publicación',
    };
  }
}
