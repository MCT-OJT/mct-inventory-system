<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_number' => fake()->numberBetween(2021300656, 2025894781),
            'name' => fake()->name(),
            'department' => fake()->randomElement(['IT department', 'Finance', 'Commercial', 'Operations'])
        ];
    }
}
