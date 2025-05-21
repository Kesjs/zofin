<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PretAutoController;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/pret-auto', [PretAutoController::class, 'submit']);
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Mail\PretAutoNotification;

Route::post('/pret-auto', function (Request $request) {
    $request->validate([
        'type' => 'required|string',
        'nom' => 'required|string',
        'montant' => 'required|numeric',
        'duree' => 'required|numeric',
        'documents.*' => 'required|file|max:2048', // max 2MB par fichier
    ]);

    $uploadedFiles = [];
    foreach ($request->file('documents', []) as $file) {
        $path = $file->store('prets/documents');
        $uploadedFiles[] = $path;
    }

    // Envoi d'email à l'admin
    Mail::to('ken2001babatounde@gmail.com')->send(new PretAutoNotification(
        $request->only(['type', 'nom', 'montant', 'duree']),
        $uploadedFiles
    ));

    return response()->json(['message' => 'Demande envoyée avec succès']);
});
