<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssetModel>
 */
class AssetModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'asset_type' => fake()->randomElement(['Monitor', 'System Unit', 'Laptop', 'Server', 'UPS', 'Printer', 'iPad', 'Smartphone', 'Accessories']),

        ];
    }
}
