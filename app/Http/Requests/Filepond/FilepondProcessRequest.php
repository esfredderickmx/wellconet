<?php

namespace App\Http\Requests\Filepond;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class FilepondProcessRequest extends FormRequest {
	/**
	 * @throws HttpResponseException
	 */
	protected function failedValidation(Validator $validator) {
		throw new HttpResponseException(new JsonResponse($validator->errors()->first(), 422));
	}

	public function rules(): array {
		return [
			'filepond_file' => 'file|image|max:1024',
		];
	}

	public function authorize(): bool {
		return true;
	}
}
