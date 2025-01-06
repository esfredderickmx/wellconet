<?php

namespace App\Http\Controllers;

use App\Enums\UserDepartment;
use App\Enums\UserOffice;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserProfileController extends Controller {
  public function completeProfile(Request $request) {
    $request->user()->update($request->validate([
      'department' => ['required', 'string', Rule::enum(UserDepartment::class)->except(UserDepartment::UNDEFINED)],
      'office' => ['required', 'string', Rule::enum(UserOffice::class)->except(UserOffice::UNDEFINED)],
    ]));
  }
}
