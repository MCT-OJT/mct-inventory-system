<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepairHistory extends Model
{
    protected $table = 'repair_histories';

    protected $fillable = [
        'inventory_id',
        'issue_description',
        'repair_status',
        'repaired_by',
        'repair_notes'
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}
