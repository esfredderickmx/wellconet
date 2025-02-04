<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posting\NewPostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostingController extends Controller {
	public function retrieveMyPosts(Request $request) {
		return Inertia::render('User/Publications/Main', [
			'posts' => Inertia::defer(fn() => Post::where('user_id', $request->user()->id)->orderByDesc('updated_at')->get(['title', 'description', 'picture', 'is_sketch', 'updated_at'])->append(['picture_url'])),
		]);
	}

	public function writeNewPost(NewPostRequest $request) {
		$validated = $request->validated();

		$validated['picture'] = $request->file('picture')->store("posts", "public");

		$post = Post::create($validated);

		$post->user()->associate($request->user())->save();
	}
}
