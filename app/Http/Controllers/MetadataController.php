<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
class MetadataController extends Controller
{
    //* DISPLAY TABLE AND DATA IN DATABASE UWU
    public function index()
    {
        //  $inventory = Inventory::with(['employee', 'asset'])->get();
        //  $employee = Employee::all();
        //  $assets = Assets::all();
        //  return Inertia::render('Inventory', ['inventory' => $inventory, 'employee' => $employee, 'assets' => $assets]);
        return Inertia::render('Metadata');
    }

    public function storeAssets(Request $request)
    {
        $request->validate([
            'asset_type' => 'required|string|max:255',
            'asset_brand' => 'required|string|max:255',
            'model_name' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // max 10MB
        ]);

        // Upload file to FTP (NAS)
        $file = $request->file('file');
        $path = $file->store('assetImages', 'ftp');

        // Save asset data to database (adjust table/model if needed)
        Assets::create([
            'asset_type' => $request->asset_type,
            'asset_brand' => $request->asset_brand,
            'model_name' => $request->model_name,
            // 'image_path' => $path,
        ]);

        return redirect()->back();
    }

    public function storeEmployee(Request $request)
    {
        $request->validate([
            'id_number' => 'required|string',
            'name' => 'required|string',
            'department' => 'required|string'
        ]);

        Employee::create([
            'id_number' => $request->id_number,
            'name' => $request->name,
            'department' => $request->department,

        ]);
        return redirect()->back();
    }
}
