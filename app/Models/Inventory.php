<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    use SoftDeletes;
    protected $table = 'inventory';

    protected $fillable = [
        'user_id',
        'serial_number',
        'asset_name',
        'status',
        'date_acquired',
        'deployed_date',
        'employee_id',
        'asset_model_id',
        'remarks'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($inventory) {
            $inventory->load('assetModel');
            $assetType = strtoupper(substr($inventory->assetModel->asset_type, 0, 3));
            $year = substr($inventory->date_acquired, 2, 2);

            $count = Inventory::whereHas('assetModel', function ($q) use ($inventory) {
                $q->where('asset_type', $inventory->assetModel->asset_type);
            })->count() + 1;

            $inventory->asset_tag = "MCT{$year}-{$assetType}" . str_pad($count, 3, '0', STR_PAD_LEFT);
        });
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function assetModel()
    {
        return $this->belongsTo(AssetModel::class);
    }
}
