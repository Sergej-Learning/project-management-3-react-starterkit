<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;

class TaskController extends Controller
{
    public function index(Project $project){
        $tasks = Task::where('project_id', $project->id)->get();
        return inertia('projects/tasks/index', [
            'tasks' => $tasks,
            'project' => $project
        ]);
    }

    public function create(Project $project){
        return inertia('projects/tasks/create', [
            'project' => $project
        ]);
    }

    public function store(Request $request, Project $project){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,standard,high',
        ]);
        $project->tasks()->create($validated);

        return redirect()->route('projects.tasks.index', $project)->with('success', 'Task created successfully');
    }

    public function edit(Project $project, Task $task){
        return inertia('projects/tasks/edit', [
            'project' => $project,
            'task' => $task
        ]);
    }
    
    public function update(Request $request, Project $project, Task $task){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,standard,high',
        ]);
        $task->update($validated);

        return redirect()->route('projects.tasks.index', $project)->with('success', 'Task updated successfully');
    }

    public function show(Project $project, Task $task){
        return inertia('tasks/show', [
            'project' => $project,
            'task' => $task
        ]);
    }

    public function destroy(Project $project, Task $task){
        $task->delete();
        return redirect()->route('projects.tasks.index', $project)->with('success', 'Task deleted successfully');
    }
}
