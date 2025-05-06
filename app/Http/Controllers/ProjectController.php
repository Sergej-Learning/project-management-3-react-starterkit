<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->cannot('viewAny', Project::class)) {
            abort(403);
        }
        $projects = Project::query();
        if ($request->user()->role == 'user') {
            $projects = $projects->where('user_id', $request->user()->id);
        }
        $projects = $projects->get();

        return Inertia::render('projects/index', [
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if($request->user()->cannot('create', Project::class)) {
            abort (403);
        }
        return Inertia::render('projects/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if($request->user()->cannot('create', Project::class)) {
            abort (403);
        }
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,standard,high',
        ]);
        
        $validatedData['user_id'] = $request->user()->id;
        Project::create($validatedData);

        return redirect()->route('projects.index')->with('Success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,Project $project)
    {
        if ($request->user()->cannot('view', $project)){
            abort (403);
        }
        $tasks = $project->tasks()->get();

        return Inertia::render('projects/show', [
            'project' => $project,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,Project $project)
    {
        if($request->user()->cannot('update', $project)) {
            abort (403);
        }
        return Inertia::render('projects/edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,standard,high',
        ]);
        $project->update($validatedData);
        return redirect()->route('projects.index')->with('Success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Project $project)
    {
        if ($request->user()->cannot('delete', $project)) {
            abort(403);
        }
        $project->delete();

        return redirect()
            ->route('projects.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
