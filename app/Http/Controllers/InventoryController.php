<?php

namespace App\Http\Controllers;

use App\Models\AssetModel;
use App\Models\Employee;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    //* DISPLAY TABLE AND DATA IN DATABASE UWU
    public function index()
    {
        $inventory = Inventory::with('employee')->get();
        $employee = Employee::all();
        $models = AssetModel::all();
        return Inertia::render('Inventory', ['assets' => $inventory, 'employee' => $employee, 'models' => $models]);
    }


    //* STORE AN ITEM TO INVENTORY <3
    public function store(Request $request)
    {
        $assetModelId = AssetModel::where('asset_type', $request->asset_type)
            ->where('model_name', $request->model_name)
            ->value('id');

        $request->validate([
            'serial_number' => 'required|string|unique:inventory,serial_number',
            'asset_tag' => 'string|unique:inventory,asset_tag',
            'asset_name' => 'required|string',
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
            'asset_name' => $request->asset_name,
            'asset_model_id' => $assetModelId,
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
        $asset = Inventory::with('employee')->findOrFail($id);

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
