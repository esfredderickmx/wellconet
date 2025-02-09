<?php

namespace App\Http\Controllers;

use App\Http\Requests\Filepond\FilepondProcessRequest;
use Illuminate\Http\Request;
use Storage;
use function response;

class FilepondController extends Controller {
	public function processFilepondUpload(FilepondProcessRequest $request) {
		$request->validated();

		$file_uploaded = $request->file('filepond_file')->store('tmp/filepond', 'public');

		return response($file_uploaded, $file_uploaded ? 200 : 500);
	}

	public function revertFilepondUpload(Request $request) {
		$file_to_delete = $request->getContent();

		if (Storage::disk('public')->exists($file_to_delete)) {
			$was_file_deleted = Storage::disk('public')->delete($file_to_delete);

			return response($was_file_deleted, $was_file_deleted ? 200 : 500);
		}

		return response()->noContent(500);
	}
}
