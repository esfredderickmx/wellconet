<?php

use Google\Exception;
use Google\Service\Oauth2;
use Google\Service\Directory;
use Google\Service\PeopleService;

if (!function_exists('sendFlashMessage')) {
  function sendFlashMessage(string $message, string $type = 'default'): void {
    Session::put('message', [
      'type' => $type,
      'message' => $message,
    ]);
  }
}

if (!function_exists('instantiateGoogleClient')) {
  /**
   * @throws Exception
   */
  function instantiateGoogleClient(): Google_Client {
    $google_client = new Google_Client();

    $google_client->setApplicationName(config('app.name'));
    $google_client->setAuthConfig(config('services.google.config_file_path'));
    $google_client->setRedirectUri(config('services.google.redirect_uri'));
    $google_client->setAccessType('online');
    $google_client->setApprovalPrompt('force');
    $google_client->setScopes([
      Oauth2::OPENID,
      Oauth2::USERINFO_EMAIL,
      Oauth2::USERINFO_PROFILE,
      Directory::ADMIN_DIRECTORY_USER_READONLY,
      PeopleService::CONTACTS_READONLY,
    ]);
    $google_client->setIncludeGrantedScopes(true);

    return $google_client;
  }
}
