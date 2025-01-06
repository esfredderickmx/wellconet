<?php

namespace App\Enums;

use ArchTech\Enums\Values;
use Arr;
use function array_slice;

enum UserDepartment: string {
  use Values;

  case UNDEFINED = 'undefined';
  case QUALITY = 'quality';
  case CLASSIFICATION = 'classification';
  case COLLECTIONS = 'collections';
  case PURCHASING = 'purchasing';
  case ACCOUNTING = 'accounting';
  case CREA = 'crea';
  case HUMAN_DEVELOPMENT = 'human_development';
  case BILLING = 'billing';
  case FINANCE = 'finance';
  case LEGAL = 'legal';
  case PAYROLL = 'payroll';
  case CUSTOMS_OPERATION = 'customs_operation';
  case CUSTOMER_SERVICE = 'customer_service';
  case ADMINISTRATIVE_SERVICES = 'administrative_services';
  case IT = 'it';
  case DIGITAL_TRANSFORMATION = 'digital_transformation';
  case SALES = 'sales';

  public static function options(): array {
    return Arr::map(array_slice(self::values(), 1), function (string $value) {
      return ['value' => $value, 'label' => self::from($value)->label()];
    });
  }

  public function label(): string {
    return match ($this) {
      self::UNDEFINED => 'No indicado',
      self::QUALITY => 'Calidad',
      self::CLASSIFICATION => 'Clasificación',
      self::COLLECTIONS => 'Cobranza',
      self::PURCHASING => 'Compras',
      self::ACCOUNTING => 'Contabilidad',
      self::CREA => 'C.R.E.A.',
      self::HUMAN_DEVELOPMENT => 'Desarrollo humano',
      self::BILLING => 'Facturación',
      self::FINANCE => 'Finanzas',
      self::LEGAL => 'Legal',
      self::PAYROLL => 'Nóminas',
      self::CUSTOMS_OPERATION => 'Operación aduanera',
      self::CUSTOMER_SERVICE => 'Servicio el cliente',
      self::ADMINISTRATIVE_SERVICES => 'Servicios administrativos',
      self::IT => 'T.I.',
      self::DIGITAL_TRANSFORMATION => 'Transformación digital',
      self::SALES => 'Ventas',
    };
  }
}
