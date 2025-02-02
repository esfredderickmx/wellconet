<?php

namespace App\Http\Requests\Posting;

use Illuminate\Foundation\Http\FormRequest;

class NewPostRequest extends FormRequest {
	public function rules(): array {
		return [
			'title' => ['required', 'string', 'max:100'],
			'body' => ['required', 'string'],
			'picture' => ['required', 'file', 'image'],
			'is_sketch' => ['boolean'],
		];
	}

	public function authorize(): bool {
		return true;
	}
}
