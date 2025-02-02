<?php

namespace Database\Factories;

use App\Models\Office;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class OfficeFactory extends Factory {
	protected $model = Office::class;

	public function definition(): array {
		// Altamira
		// Ciudad de México
		// Iberia
		// Lázaro Cárdenas
		// León
		// Manzanillo
		// Querétaro
		// Veracruz
		
		return [
			'uuid' => $this->faker->uuid(),
			'name' => $this->faker->city(),
		];
	}
}
