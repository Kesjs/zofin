<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PretAutoNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $nom;
    public $montant;
    public $duree;
    public $files;

    public function __construct($nom, $montant, $duree, $files)
    {
        $this->nom = $nom;
        $this->montant = $montant;
        $this->duree = $duree;
        $this->files = $files;
    }

    public function build()
    {
        $mail = $this->subject('Nouvelle demande de prêt auto')
                     ->view('emails.pret_auto');

        foreach ($this->files as $file) {
            $mail->attach($file['path'], [
                'as' => $file['original_name']
            ]);
        }

        return $mail;
    }
}
