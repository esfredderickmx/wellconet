<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Models\User;
use Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   */
  public function register(): void {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void {
    Vite::prefetch(concurrency: 3);

    Gate::define('write-posts', function (User $user) {
      return $user->role !== UserRole::BOSS;
    });

    Gate::define('handle-announcements', function (User $user) {
      return $user->role === UserRole::ANNOUNCER || $user->role === UserRole::MANAGER || $user->role === UserRole::ADMIN;
    });

    Gate::define('handle-news', function (User $user) {
      return $user->role === UserRole::JOURNALIST || $user->role === UserRole::ADMIN;
    });

    Gate::define('handle-communications', function (User $user) {
      return $user->role === UserRole::NEWSCASTER || $user->role === UserRole::ADMIN;
    });

    Gate::define('make-courses', function (User $user) {
      return $user->role === UserRole::TRAINER || $user->role === UserRole::ADMIN;
    });
  }
}
