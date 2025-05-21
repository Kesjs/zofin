<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PretAutoController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'montant' => 'required|numeric',
            'duree' => 'required|numeric',
            'documents.*' => 'required|file|max:5120'
        ]);

        // Sauvegarde des fichiers
        foreach ($request->file('documents') as $file) {
            $file->store('dossiers-prets');
        }

        // Envoi du mail
        Mail::raw(
            "Nouvelle demande de prêt auto\nNom: {$request->nom}\nMontant: {$request->montant}\nDurée: {$request->duree}",
            function ($message) {
                $message->to('tonemail@gmail.com')
                        ->subject('Nouvelle demande de prêt auto');
            }
        );

        return response()->json(['message' => 'Demande reçue avec succès'], 200);
    }
}
