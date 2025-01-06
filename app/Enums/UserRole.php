<?php

namespace App\Enums;

use ArchTech\Enums\Values;
use Arr;
use function array_slice;

enum UserRole: int {
  use Values;

  case ADMIN = 1;
  case COMMON = 2;
  case ANNOUNCER = 3;
  case JOURNALIST = 4;
  case NEWSCASTER = 5;
  case TRAINER = 6;
  case SHOPKEEPER = 7;
  case MODERATOR = 8;
  case MULTITASK = 9;
  case MANAGER = 10;
  case BOSS = 11;

  public static function options(): array {
    return Arr::map(array_slice(self::values(), 1), function (string $value) {
      return ['value' => $value, 'label' => self::from($value)->label()];
    });
  }

  public function label(): string {
    return match ($this) {
      self::ADMIN => 'Administrador',
      self::COMMON => 'Usuario común',
      self::ANNOUNCER => 'Anunciante',
      self::JOURNALIST => 'Periodista',
      self::NEWSCASTER => 'Comunicador',
      self::TRAINER => 'Capacitador',
      self::SHOPKEEPER => 'Tendero',
      self::MODERATOR => 'Moderador',
      self::MULTITASK => 'Multitarea',
      self::MANAGER => 'Directivo',
      self::BOSS => 'Superior',
    };
  }
}
