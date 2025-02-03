<?php

namespace App\Http\Controllers;

use App\Enums\FrontendNotificationType;
use App\Models\User;
use Auth;
use Google\Exception;
use Google\Service\Oauth2;
use Google\Service\PeopleService;
use Illuminate\Http\Request;
use Redirect;
use Session;
use Str;
use function instantiateGoogleClient;
use function route;
use function sendFlashNotification;

class AuthenticationController extends Controller {
  /**
   * @throws Exception
   */
  public function authenticationRedirect() {
	  Auth::login(User::whereId(7)->first());
	  Session::regenerate();

		sendFlashNotification('Sesión iniciada correctamente.', FrontendNotificationType::SUCCESS);
		
	  return Redirect::intended(route('home'));
		
    // return Redirect::to(instantiateGoogleClient()->createAuthUrl());
  }

  /**
   * @throws Exception
   * @throws \Google\Service\Exception
   */
  public function handleCallback(Request $request) {
    $google_client = instantiateGoogleClient();
    $access_token = $google_client->fetchAccessTokenWithAuthCode($request->input('code'));

    $google_client->setAccessToken($access_token);

    $oauth_service = new Oauth2($google_client);
    $people_service = new PeopleService($google_client);

    $google_user = $oauth_service->userinfo->get();
    $directory_info = $people_service->people->get("people/me", [
      'personFields' => 'organizations',
    ]);

    $user = User::where('google_id', $google_user->id)->first();

    if (!$user) {
      $user = User::create([
        'google_id' => $google_user->id,
        'name' => $google_user->name,
        'email' => $google_user->email,
        'job_position' => $directory_info->getOrganizations()[0]->title,
        'picture' => $google_user->picture,
        'password' => Str::password(),
      ]);
    }

    Auth::login($user);
    Session::regenerate();

    sendFlashMessage('Sesión iniciada correctamente.');

    return Redirect::intended(route('home'));
  }

  public function signOut() {
    Auth::logout();

    Session::invalidate();
    Session::regenerateToken();

	  sendFlashNotification('Sesión finalizada correctamente.', FrontendNotificationType::INFO);

    return Redirect::route('sign-in');
  }
}
