<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'mobile',
        'address',
    ];
    protected $casts = [
        'email' => 'string',
        'mobile' => 'string',
        'address' => 'string',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
