<?php

namespace Database\Seeders;

use App\Models\Office;
use Illuminate\Database\Seeder;
use Str;

class OfficesTableSeeder extends Seeder {
	public function run(): void {
		$inserts = [
			['uuid' => Str::orderedUuid(), 'name' => 'Altamira'],
			['uuid' => Str::orderedUuid(), 'name' => 'Ciudad de México'],
			['uuid' => Str::orderedUuid(), 'name' => 'Iberia'],
			['uuid' => Str::orderedUuid(), 'name' => 'Lázaro Cárdenas'],
			['uuid' => Str::orderedUuid(), 'name' => 'León'],
			['uuid' => Str::orderedUuid(), 'name' => 'Manzanillo'],
			['uuid' => Str::orderedUuid(), 'name' => 'Querétaro'],
			['uuid' => Str::orderedUuid(), 'name' => 'Veracruz'],
		];

		foreach ($inserts as $insert) {
			Office::create($insert);
		}
	}
}
