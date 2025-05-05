<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use App\Models\Employee;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Milon\Barcode\Facades\DNS2DFacade;
use Illuminate\Support\Facades\Response;

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
        $inventory = Inventory::with(['employee', 'asset'])->get();
        $employee = Employee::all();
        $assets = Assets::all();

        $specificAsset = Inventory::with(['employee', 'asset'])->findOrFail($id);


        $filename = $specificAsset->asset->asset_image;

        if (!Storage::disk('ftp')->exists($filename)) {
            abort(404);
        }

        $file = Storage::disk('ftp')->get($filename);
        $mime = Storage::disk('ftp')->mimeType($filename);
        $imageBase64 = 'data:' . $mime . ';base64,' . base64_encode($file);

        return Inertia::render('Inventory/ItemSpecific', [
            'inventory' => $inventory,
            'employee' => $employee,
            'assets' => $assets,
            'specificAsset' => $specificAsset,
            'assetImage' => $imageBase64
        ]);
    }

    //* DELETE SPECIFIC ITEM IN DATABASE yieeee <3
    public function destroy($id)
    {
        $record = Inventory::findOrFail($id);
        $record->delete();

        return redirect()->route('inventory.index');
    }

    //* UPDATE SPECIFIC ITEM RECORN IN DATABASE ARGGGGGHH
    public function update(Request $request)
    {
        $assetId = Assets::where('asset_type', $request->asset_type)
            ->where('asset_brand', $request->asset_brand)
            ->value('id');

        $inventoryRecord = Inventory::findOrFail($request->id);


        $inventoryRecord->update([
            'user_id' => auth()->id(),
            'employee_id' => $request->employee_id,
            'serial_number' => $request->serial_number,
            'status' => $request->status,
            'date_acquired' => $request->date_acquired,
            'deployed_date' => $request->deployed_date,
            'remarks' => $request->remarks,
            'asset_id' => $assetId,

        ]);
        return back();
    }
    public function generate($id)
    {
        $qrCode = DNS2DFacade::getBarcodePNG($id, 'QRCODE', 4, 4);

        return Response::make(base64_decode($qrCode), 200, [
            'Content-Type' => 'image/png',
            'Content-Disposition' => 'inline; filename="qr.png"',
        ]);
    }
}
