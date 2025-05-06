<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::factory()
            ->count(50)
            ->create([
                'user_id' => \App\Models\User::factory(),
                'project_id' => \App\Models\Project::factory(),
                'assigned_to' => \App\Models\User::factory(),
            ]);
            
    }
}
