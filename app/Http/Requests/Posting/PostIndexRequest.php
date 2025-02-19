<?php

namespace App\Http\Requests\Posting;

use Illuminate\Foundation\Http\FormRequest;

class PostIndexRequest extends FormRequest {
	public function rules(): array {
		return [
			'search' => 'nullable|string',
			'date_filter' => 'nullable|string',
			'sketch_filter' => 'nullable|string',
		];
	}

	public function authorize(): bool {
		return true;
	}
}
