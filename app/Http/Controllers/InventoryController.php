<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use App\Models\Employee;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    //* DISPLAY TABLE AND DATA IN DATABASE UWU
    public function index()
    {
        $inventory = Inventory::with(['employee', 'asset'])->get();
        $employee = Employee::all();
        $assets = Assets::all();
        return Inertia::render('Inventory', ['inventory' => $inventory, 'employee' => $employee, 'assets' => $assets]);
    }


    //* STORE AN ITEM TO INVENTORY <3
    public function store(Request $request)
    {
        $assetId = Assets::where('asset_type', $request->asset_type)
            ->where('asset_brand', $request->asset_brand)
            ->value('id');

        $request->validate([
            'serial_number' => 'required|string|unique:inventory,serial_number',
            'asset_tag' => 'string|unique:inventory,asset_tag',
            'status' => 'required|string',
            'date_acquired' => 'required|date',
            'deployed_date' => 'nullable|date',
            'employee_id' => 'nullable|integer',
            'remarks' => 'nullable|string',
        ]);

        Inventory::create([
            'user_id' => auth()->id(),
            'serial_number' => $request->serial_number,
            'asset_tag' => $request->asset_tag,
            'asset_id' => $assetId,
            'status' => $request->status,
            'date_acquired' => $request->date_acquired,
            'deployed_date' => $request->deployed_date,
            'employee_id' => $request->employee_id,
            'remarks' => $request->remarks,
        ]);

        return redirect()->back();
    }

    //* SHOW SPECIFIC ITEM FULL DETAILS ^-^
    public function show($id)
    {
        $asset = Inventory::with(['employee', 'asset'])->findOrFail($id);

        return Inertia::render('Inventory/ItemSpecific', [
            'asset' => $asset
        ]);
    }

    //* DELETE SPECIFIC ITEM IN DATABASE yieeee <3
    public function destroy($id)
    {
        $record = Inventory::findOrFail($id);
        $record->delete();

        return redirect()->route('inventory.index');
    }

}
