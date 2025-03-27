<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
class InventoryController extends Controller
{
    //* STORE AN ITEM TO INVENTORY <3
    public function store(Request $request)
    {
        $request->validate([
            'serial_number' => 'required|string|unique:inventory,serial_number',
            'asset_tag' => 'string|unique:inventory,asset_tag',
            'asset_name' => 'required|string',
            'asset_type' => 'required|string',
            'status' => 'required|string',
            'date_acquired' => 'required|date',
            'deployed_date' => 'nullable|date',
            'user_incharge' => 'nullable|string',
            'remarks' => 'nullable|string',
        ]);

        Inventory::create([
            'user_id' => auth()->id(),
            'serial_number' => $request->serial_number,
            'asset_tag' => $request->asset_tag,
            'asset_name' => $request->asset_name,
            'asset_type' => $request->asset_type,
            'status' => $request->status,
            'date_acquired' => $request->date_acquired,
            'deployed_date' => $request->deployed_date,
            'user_incharge' => $request->user_incharge,
            'remarks' => $request->remarks,
        ]);

        return redirect()->route('inventory');
    }
}
