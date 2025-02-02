<?php

namespace App\Http\Requests\UserProfile;

use Illuminate\Foundation\Http\FormRequest;

class CompleteProfileRequest extends FormRequest {
	public function rules(): array {
		return [
			'birth_date' => 'required|date',
			'department' => 'required|string|uuid|exists:App\Models\Department,uuid',
			'office' => 'required|string|uuid|exists:App\Models\Office,uuid',
		];
	}

	public function authorize(): bool {
		return true;
	}
}
