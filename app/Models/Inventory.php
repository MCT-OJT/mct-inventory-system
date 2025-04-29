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
        'asset_brand',
        'status',
        'date_acquired',
        'deployed_date',
        'employee_id',
        'asset_id',
        'remarks'
    ];
    public static function boot()
    {
        parent::boot();

        static::creating(function ($inventory) {
            self::generateAssetTag($inventory);
        });

        static::updating(function ($inventory) {
            self::generateAssetTag($inventory);
        });
    }

    protected static function generateAssetTag($inventory)
    {
        $asset = $inventory->asset;

        if (!$asset) {
            throw new \Exception("Asset not found for ID: {$inventory->asset_id}");
        }

        $assetType = strtoupper(substr($asset->asset_type, 0, 3));
        $year = substr($inventory->date_acquired, 2, 2);

        $count = Inventory::whereHas('asset', function ($q) use ($asset) {
            $q->where('asset_type', $asset->asset_type);
        })->count()+1;

        $inventory->asset_tag = "MCT{$year}-{$assetType}" . str_pad($count, 3, '0', STR_PAD_LEFT);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function asset()
    {
        return $this->belongsTo(Assets::class);
    }
}
