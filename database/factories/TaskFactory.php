<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'user_id' => \App\Models\User::factory(),
            'project_id' => \App\Models\Project::factory(),
            'start_date' => $this->faker->date(),
            'due_date' => $this->faker->date(),             
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => $this->faker->randomElement(['low', 'standard', 'high']),
            'attachment' => $this->faker->filePath(),
            'assigned_to' => \App\Models\User::factory(),
        ];
    }
}
