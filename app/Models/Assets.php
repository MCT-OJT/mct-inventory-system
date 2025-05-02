<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assets extends Model
{
    // use HasFactory;
    protected $table = 'assets';

    protected $fillable = [
        'asset_type',
        'asset_brand',
        'model_name',
        'asset_image'
    ];
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
