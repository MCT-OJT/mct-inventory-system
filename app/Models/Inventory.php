<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $table = 'inventory';

    protected $fillable = [
        'user_id',
        'serial_number',
        'asset_name',
        'asset_type',
        'status',
        'date_acquired',
        'deployed_date',
        'employee_id',
        'remarks'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($inventory) {
            $year = substr($inventory->date_acquired, 2, 2);
            $assetType = strtoupper(substr($inventory->asset_type, 0, 3));
            $count = Inventory::where('asset_type', $inventory->asset_type)->count() + 1;

            $inventory->asset_tag = "MCT{$year}-{$assetType}" . str_pad($count, 3, '0', STR_PAD_LEFT);
        });
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
