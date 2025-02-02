<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProfile\CompleteProfileRequest;
use App\Models\Department;
use App\Models\Office;
use Illuminate\Support\Carbon;

class UserProfileController extends Controller {
	public function completeProfile(CompleteProfileRequest $request) {
		$validated = $request->validated();

		$request->user()->birth_date = Carbon::parse($validated['birth_date']);
		$request->user()->department()->associate(Department::firstWhere('uuid', $validated['department']));
		$request->user()->office()->associate(Office::firstWhere('uuid', $validated['office']));

		$request->user()->save();
	}
}
