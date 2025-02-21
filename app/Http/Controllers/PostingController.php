<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posting\NewPostRequest;
use App\Http\Requests\Posting\PostIndexRequest;
use App\Models\Post;
use Gate;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;
use Str;
use function abort;

class PostingController extends Controller {
	public function retrieveMyPosts(PostIndexRequest $request) {
		$search = $request->safe()->string('search');
		$date_filter = $request->safe()->boolean('date_filter', true);

		if ($request->exists('sketch_filter')) {
			$sketch_filter = $request->safe()->boolean('sketch_filter');
		} else {
			$sketch_filter = null;
		}

		$posts = Post::query()
		             ->where('user_id', $request->user()->id)
		             ->when($search, fn(Builder $query) => $query->whereLike('title', "%$search%"))
		             ->when($sketch_filter !== null, fn(Builder $query) => $query->where('is_sketch', $sketch_filter))
		             ->when($date_filter, fn(Builder $query) => $date_filter ? $query->latest('updated_at') : $query->oldest('updated_at'))
		             ->paginate(10, ['title', 'description', 'picture', 'is_sketch', 'updated_at'])
		             ->withQueryString()
		             ->through(fn(Post $post) => $post->append('picture_url'));

		return Inertia::render('User/Publications/Index', [
			'posts' => Inertia::defer(fn() => $posts),
		]);
	}

	public function writeNewPost(NewPostRequest $request) {
		$validated = $request->validated();

		$filename_to_move = Str::of("posts/")->append(Str::afterLast($validated['picture'], '/'));

		if (Storage::disk('public')->move($validated['picture'], $filename_to_move)) {
			$validated['picture'] = $filename_to_move;

			$post = Post::create($validated);

			$post->user()->associate($request->user())->save();
		}
	}

	public function deletePostById(Request $request, Post $post) {
		if ($request->user()->can('delete-post', $post)) {
			$post->delete();
		}

		abort(403);
	}
}
