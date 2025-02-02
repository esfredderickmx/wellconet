<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posting\NewPostRequest;
use App\Models\Post;

class PostingController extends Controller {
	public function writeNewPost(NewPostRequest $request) {
		$validated = $request->validated();
		
		$validated['picture'] = $request->file('picture')->store("posts");

		$post = Post::create($validated);

		$post->user()->associate($request->user())->save();
	}
}
