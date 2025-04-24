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
        $path = $file->store('assetImages', 'ftp');
        // dd($path);
        return redirect()->route('dashboard')->with('success', 'File uploaded successfully to NAS.');
    }
    public function show($filename)
    {
        $path = "assetImages/{$filename}";

        if (!Storage::disk('ftp')->exists($path)) {
            abort(404);
        }

        $file = Storage::disk('ftp')->get($path);
        $mime = Storage::disk('ftp')->mimeType($path);

        return response($file)->header('Content-Type', $mime);
    }

}
