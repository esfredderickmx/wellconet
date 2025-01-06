<?php

namespace App\Http\Middleware;

use App\Enums\PublicationType;
use App\Enums\UserDepartment;
use App\Enums\UserOffice;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware {
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): ?string {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array {
    return [
      ...parent::share($request),
      'auth' => [
        'user' => $request->user() ? $request->user()->only(['name', 'email', 'job_position', 'department_name', 'office_name', 'picture', 'is_profile_complete', 'email_verified_at']) : null,
      ],
      'flash' => [
        'message' => $request->session()->exists('message') ? $request->session()->pull('message') : null,
      ],
      'enums' => [
        'user_departments' => $request->user() && !$request->user()->is_profile_complete ? UserDepartment::options() : null,
        'user_offices' => $request->user() && !$request->user()->is_profile_complete ? UserOffice::options() : null,
      ],
      'can' => [
        'write_posts' => $request->user()?->can('write-posts') ?? null,
        'handle_announcements' => $request->user()?->can('handle-announcements') ?? null,
        'handle_news' => $request->user()?->can('handle-news') ?? null,
        'handle_communications' => $request->user()?->can('handle-communications') ?? null,
        'make_courses' => $request->user()?->can('make-courses') ?? null,
      ],
    ];
  }
}
