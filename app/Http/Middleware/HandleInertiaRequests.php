<?php

namespace App\Http\Middleware;

use App\Models\Department;
use App\Models\Office;
use App\Models\User;
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
				'user' => $request->user()
					? User::with('department:id,name', 'office:id,name')->find($request->user()->id, ['department_id', 'office_id', 'name', 'email', 'job_position', 'picture', 'email_verified_at'])->append('is_profile_complete')->toArray()
					: null,
			],
			'flash' => [
				'message' => $request->session()->exists('message')
					? $request->session()->pull('message')
					: null,
				'notification' => $request->session()->exists('notification')
					? $request->session()->pull('notification')
					: null,
			],
			'dictionaries' => [
				'departments' => $request->user() && !$request->user()->is_profile_complete
					? Department::get(['uuid', 'name'])
					: null,
				'offices' => $request->user() && !$request->user()->is_profile_complete
					? Office::get(['uuid', 'name'])
					: null,
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
