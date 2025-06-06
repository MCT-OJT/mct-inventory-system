<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Employee extends Model
{
    use HasFactory;

    protected $table = 'employees';

    protected $fillable = [
        'id_number',
        'name',
        'department'
    ];

    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }
}
