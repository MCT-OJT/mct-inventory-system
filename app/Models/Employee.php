<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employees';
    public function inventory()
{
    return $this->hasMany(Inventory::class);
}
}
