<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;


class TaskPolicy
{
    
        /**
         * Determine whether the user can view any models.
         */
        public function viewAny(User $user): bool
        {
            return in_array($user->role, ['admin','user','projectmanager']);
        }
    
        /**
         * Determine whether the user can view the model.
         */
        public function view(User $user, Task $task): bool
        {
            if (in_array($user->role, ['admin', 'projectmanager'])) {
                return true;
            }
            return $task->user_id === $user->id;
        }
    
        /**
         * Determine whether the user can create models.
         */
        public function create(User $user): bool
        {
            return in_array($user->role, ['admin','projectmanager']);
        }
    
        /**
         * Determine whether the user can update the model.
         */
        public function update(User $user, Task $Task): bool
        {
            if ($user->role == 'admin'||$user->role=='projectmanager') {
                return true;
            }
            return $Task->user_id == $user->id;
        }
    
        /**
         * Determine whether the user can delete the model.
         */
        public function delete(User $user, Task $Task): bool
        {
            if ($user->role == 'admin'||$user->role =='projectmanager') {
                return true;
            }
            return $Task->user_id == $user->id;
        }
    
        /**
         * Determine whether the user can restore the model.
         */
        public function restore(User $user, Task $Task): bool
        {
            return false;
        }
    
        /**
         * Determine whether the user can permanently delete the model.
         */
        public function forceDelete(User $user, Task $Task): bool
        {
            return false;
        }
    }


