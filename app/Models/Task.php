<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'project_id',
        'start_date',
        'due_date',
        'status',
        'priority',
        'attachment',
        'assigned_to'
    ];
    protected $casts = [
        // 'start_date' => 'date',
        // 'due_date' => 'date',
        'status' => 'string',
        'priority' => 'string',
    ];
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
    protected static function booted()
    {
        static::saved(function ($task) {
            event(new \App\Events\TaskUpdated($task));
        });
        static::deleted(function ($task) {
            event(new \App\Events\TaskUpdated($task));
        });
    }
}
