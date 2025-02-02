<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class DepartmentFactory extends Factory {
	protected $model = Department::class;

	public function definition(): array {
		// Calidad
		// Clasificación
		// Cobranza
		// Compras
		// Contabilidad
		// C.R.E.A.
		// Desarrollo humano
		// Facturación
		// Finanzas
		// Legal
		// Nóminas
		// Operación aduanera
		// Servicio el cliente
		// Servicios administrativos
		// T.I.
		// Transformación digital
		// Ventas
		
		return [
			'uuid' => $this->faker->uuid(),
			'name' => $this->faker->domainName(),
		];
	}
}
