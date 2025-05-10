<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
    
    //* STORE NEW ASSETS FOR DROPDOWN
    public function storeAssets(Request $request)
    {
        $request->validate([
            'asset_type' => 'required|string|max:255',
            'asset_brand' => 'required|string|max:255',
            'model_name' => 'required|string|max:255',
            'file' => 'required|file|max:10240',
        ]);

        $file = $request->file('file');

        $name = Str::slug("{$request->asset_type}_{$request->asset_brand}_{$request->model_name}", '-');

        $extension = $file->getClientOriginalExtension();
        $filename = "{$name}.{$extension}";

        $path = $file->storeAs('assetImages', $filename, 'ftp');

        Assets::create([
            'asset_type' => $request->asset_type,
            'asset_brand' => $request->asset_brand,
            'model_name' => $request->model_name,
            'asset_image' => $path,
        ]);

        return redirect()->back();
    }
    //* STORE NEW EMPLOYEE FOR DROPDOWN
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
