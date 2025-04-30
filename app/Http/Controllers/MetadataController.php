<?php

namespace App\Http\Controllers;

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
}
