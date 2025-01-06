<?php

namespace App\Enums;

use ArchTech\Enums\Values;
use Arr;
use function array_slice;

enum UserOffice: string {
  use Values;

  case UNDEFINED = 'undefined';
  case ALTAMIRA = 'altamira';
  case CDMX = 'cdmx';
  case IBERIA = 'iberia';
  case LAZARO = 'lazaro';
  case LEON = 'leon';
  case MANZANILLO = 'manzanillo';
  case QUERETARO = 'queretaro';
  case VERACRUZ = 'veracruz';

  public static function options(): array {
    return Arr::map(array_slice(self::values(), 1), function (string $value) {
      return ['value' => $value, 'label' => self::from($value)->label()];
    });
  }

  public function label(): string {
    return match ($this) {
      self::UNDEFINED => 'No indicada',
      self::ALTAMIRA => 'Altamira',
      self::CDMX => 'Ciudad de México',
      self::IBERIA => 'Iberia',
      self::LAZARO => 'Lázaro Cárdenas',
      self::LEON => 'León',
      self::MANZANILLO => 'Manzanillo',
      self::QUERETARO => 'Querétaro',
      self::VERACRUZ => 'Veracruz',
    };
  }
}
