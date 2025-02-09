<?php

namespace App\Http\Requests\Posting;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Storage;

class NewPostRequest extends FormRequest {
	public function rules(): array {
		return [
			'title' => ['required', 'string', 'max:100'],
			'description' => ['required', 'string', 'max:350'],
			'body' => ['required', 'string'],
			'picture' => [
				'required',
				function (string $attribute, mixed $value, Closure $fail) {
					if (!Storage::disk('public')->exists($value)) {
						$fail("El archivo indicado no existe.");
					}
				},
			],
			'is_sketch' => ['boolean'],
		];
	}

	public function authorize(): bool {
		return true;
	}
}
