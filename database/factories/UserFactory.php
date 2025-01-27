<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use function fake;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory {
	/**
	 * The current password being used by the factory.
	 */
	protected static ?string $password;

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array {
		$picture_seed = Str::random(10);
		
		return [
			'google_id' => fake()->uuid(),
			'name' => fake()->name(),
			'email' => fake()->unique()->safeEmail(),
			'job_position' => fake()->jobTitle(),
			'picture' => "https://picsum.photos/seed/$picture_seed/48",
			'password' => static::$password ??= Hash::make('password'),
			// 'email_verified_at' => now(),
			// 'remember_token' => Str::random(10),
		];
	}

	/**
	 * Indicate that the model's email address should be unverified.
	 */
	public function unverified(): static {
		return $this->state(fn(array $attributes) => [
			'email_verified_at' => null,
		]);
	}
}
