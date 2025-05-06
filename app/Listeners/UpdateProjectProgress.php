<?php

namespace App\Listeners;

use App\Events\TaskUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateProjectProgress
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TaskUpdated $event): void
    {
        $project = $event->task->project;

        $completedTasks = $project->tasks()->where('status', 'completed')->count();
        $totalTasks = $project->tasks()->count();
        $project->progress = $totalTasks > 0 ? ($completedTasks*100) / $totalTasks: 0;
        $project->save();

    }
}
