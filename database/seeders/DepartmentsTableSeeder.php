<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;
use Str;

class DepartmentsTableSeeder extends Seeder {
	public function run(): void {
		$inserts = [
			['uuid' => Str::orderedUuid(), 'name' => 'Calidad'],
			['uuid' => Str::orderedUuid(), 'name' => 'Clasificación'],
			['uuid' => Str::orderedUuid(), 'name' => 'Cobranza'],
			['uuid' => Str::orderedUuid(), 'name' => 'Compras'],
			['uuid' => Str::orderedUuid(), 'name' => 'Contabilidad'],
			['uuid' => Str::orderedUuid(), 'name' => 'C.R.E.A.'],
			['uuid' => Str::orderedUuid(), 'name' => 'Desarrollo humano'],
			['uuid' => Str::orderedUuid(), 'name' => 'Facturación'],
			['uuid' => Str::orderedUuid(), 'name' => 'Finanzas'],
			['uuid' => Str::orderedUuid(), 'name' => 'Legal'],
			['uuid' => Str::orderedUuid(), 'name' => 'Nóminas'],
			['uuid' => Str::orderedUuid(), 'name' => 'Operación aduanera'],
			['uuid' => Str::orderedUuid(), 'name' => 'Servicio el cliente'],
			['uuid' => Str::orderedUuid(), 'name' => 'Servicios administrativos'],
			['uuid' => Str::orderedUuid(), 'name' => 'Tecnologías de la información'],
			['uuid' => Str::orderedUuid(), 'name' => 'Transformación digital'],
			['uuid' => Str::orderedUuid(), 'name' => 'Ventas'],
		];

		foreach ($inserts as $insert) {
			Department::create($insert);
		}
	}
}
