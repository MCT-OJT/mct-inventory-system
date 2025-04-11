<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'file' => 'required|file|max:10240',
    ]);

    $file = $request->file('file');
    $path = $file->store('uploads', 'ftp');

    return redirect()->route('dashboard')->with('success', 'File uploaded successfully to NAS.');
}

}
