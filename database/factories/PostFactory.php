<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory {

	public function definition(): array {
		$picture_seed = Str::random(10);
		
		return [
			'title' => $this->faker->sentence(),
			'description' => $this->faker->paragraph(),
			'body' => $this->faker->text(),
			'picture' => "https://picsum.photos/seed/$picture_seed/300/200",
			'is_sketch' => $this->faker->boolean(),
			
			// 'user_id' => User::factory(),
		];
	}
}
