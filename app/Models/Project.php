<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{   
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'start_date',
        'due_date',
        'status',
        'priority',
        'progress',
    ];
    protected $casts = [
        // 'start_date' => 'date',
        // 'due_date' => 'date',
        'status' => 'string',
        'priority' => 'string',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
