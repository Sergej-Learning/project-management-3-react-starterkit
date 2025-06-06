<?php

namespace App\Http\Middleware;

use App\Models\Contact;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
                'can' => [
                    'contacts' => [
                        'viewAny' => $request->user()?->can('viewAny', Contact::class),
                        'create' => $request->user()?->can('create', Contact::class),
                    ],
                    'projects' => [
                        'viewAny' => $request->user()?->can('viewAny', Project::class),
                        'show' => $request->user()?->can('show', Project::class),
                        'create' => $request->user()?->can('create', Project::class),
                    ],
                    'tasks' => [
                        'viewAny' => $request->user()?->can('viewAny', Task::class),
                        'create' => $request->user()?->can('create', Task::class),
                    ],
                ]

            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
