<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssetModel extends Model
{
    use HasFactory;
    protected $table = 'asset_models';

    protected $fillable = [
        'asset_type',
        'model_name',
    ];
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
