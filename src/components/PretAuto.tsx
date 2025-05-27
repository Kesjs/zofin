/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar'; // adapte le chemin si besoin

type Step = 'intro' | 'conditions' | 'form' | 'documents' | 'summary' | 'confirmation';

const LOCAL_STORAGE_KEY = 'pretAutoData';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

// Ajout du JSON-LD pour le SEO Prêt Auto
const pretAutoJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Prêt Auto en Ligne – Financement Véhicule Neuf ou d’Occasion",
  "description": "Obtenez un prêt auto en ligne pour financer l'achat de votre voiture neuve ou d'occasion. Procédure rapide, taux avantageux, réponse sous 48h. Service 100% en ligne, sécurisé et personnalisé.",
  "provider": {
    "@type": "Organization",
    "name": "Zofin",
    "url": "https://zofin.space"
  },
  "areaServed": "FR",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR"
  }
};

const PretAuto: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [isAccepted, setIsAccepted] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [montant, setMontant] = useState('');
  const [duree, setDuree] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [docError, setDocError] = useState('');

  // Pour l'envoi du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sauvegarde automatique dans le localStorage à chaque changement
  useEffect(() => {
    const data = {
      currentStep,
      isAccepted,
      nom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      montant,
      duree,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [
    currentStep,
    isAccepted,
    nom,
    email,
    telephone,
    adresse,
    codePostal,
    ville,
    montant,
    duree,
  ]);

  // Restauration automatique au chargement
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentStep(data.currentStep || 'intro');
        setIsAccepted(data.isAccepted || false);
        setNom(data.nom || '');
        setEmail(data.email || '');
        setTelephone(data.telephone || '');
        setAdresse(data.adresse || '');
        setCodePostal(data.codePostal || '');
        setVille(data.ville || '');
        setMontant(data.montant || '');
        setDuree(data.duree || '');
      } catch {
        // ignore erreur de parsing
      }
    }
  }, []);

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'intro': return 'conditions';
        case 'conditions': return 'form';
        case 'form': return 'documents';
        case 'documents': return 'summary';
        case 'summary': return 'confirmation';
        default: return prev;
      }
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'confirmation': return 'summary';
        case 'summary': return 'documents';
        case 'documents': return 'form';
        case 'form': return 'conditions';
        case 'conditions': return 'intro';
        default: return prev;
      }
    });
  }, []);

  const handleAcceptConditions = () => {
    if (!isAccepted) {
      alert("Vous devez accepter les conditions pour continuer.");
      return;
    }
    nextStep();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !montant || !duree) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    nextStep();
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocError('');
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const tooLarge = newFiles.some(f => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
      if (tooLarge) {
        setDocError(`Un ou plusieurs fichiers dépassent la taille maximale de ${MAX_FILE_SIZE_MB} Mo.`);
        return;
      }
      const invalidType = newFiles.some(f => !ALLOWED_TYPES.includes(f.type));
      if (invalidType) {
        setDocError('Seuls les fichiers PDF, JPEG et PNG sont autorisés.');
        return;
      }
      setDocuments(prev => {
        const existingIds = new Set(prev.map(f => f.name + f.size));
        const filteredNew = newFiles.filter(f => !existingIds.has(f.name + f.size));
        return [...prev, ...filteredNew];
      });
    }
  };

  const removeDocument = (indexToRemove: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== indexToRemove));
    setDocError('');
  };

  const handleSubmitDocuments = (e: React.FormEvent) => {
    e.preventDefault();
    if (documents.length === 0) {
      setDocError('Veuillez joindre vos documents obligatoires.');
      return;
    }
    nextStep();
  };

  const resetAll = () => {
    setIsAccepted(false);
    setNom('');
    setEmail('');
    setTelephone('');
    setAdresse('');
    setCodePostal('');
    setVille('');
    setMontant('');
    setDuree('');
    setDocuments([]);
    setDocError('');
    setCurrentStep('intro');
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Efface la sauvegarde
  };

  // Fonction d'envoi du formulaire à votre script PHP
  const sendFormData = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('typePret', 'Prêt Automobile');
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('telephone', telephone);
    formData.append('adresse', adresse);
    formData.append('codePostal', codePostal);
    formData.append('ville', ville);
    formData.append('montant', montant);
    formData.append('duree', duree);

    documents.forEach((file) => {
      formData.append('documents[]', file);
    });

    try {
      const response = await fetch('https://antiquewhite-salamander-475773.hostingersite.com/send-mail.php', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Erreur lors de l’envoi');
      }
      nextStep(); // Passe à l’étape confirmation
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message || 'Erreur inconnue');
      } else {
        setSubmitError('Erreur inconnue');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO JSON-LD pour le Prêt Auto */}
      <script type="application/ld+json">{JSON.stringify(pretAutoJsonLd)}</script>
      <div
        className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4"
        aria-label="Demande de prêt automobile"
      >
        <div className="max-w-lg w-full p-6 bg-white rounded shadow-lg">
          <h1 className="text-3xl font-bold text-center text-yellow-600 mb-4">
            Prêt Auto en Ligne – Financement Véhicule Neuf ou d’Occasion
          </h1>
          <ProgressBar currentStep={currentStep} /><br />
          <AnimatePresence mode="wait">
            {currentStep === 'intro' && (
              <motion.div
                key="intro"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-700 mb-6">
                  Obtenez votre <strong>prêt auto</strong> en ligne en quelques étapes simples. Notre service vous permet de <strong>financer l’achat de votre voiture neuve ou d’occasion</strong> rapidement, avec un <strong>taux avantageux</strong> et une réponse sous 48h. Profitez d’un accompagnement personnalisé pour concrétiser votre projet automobile en toute sérénité.
                </p>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">🚗 Financement rapide et flexible</h2>
                  <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
                  <p className="text-gray-700">
                    Simulez votre <strong>crédit auto</strong> et obtenez une offre adaptée à votre budget. Que ce soit pour une citadine, un SUV ou un utilitaire, notre solution s’adapte à vos besoins.
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">🔒 Démarches 100% en ligne et sécurisées</h2>
                  <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
                  <p className="text-gray-700">
                    Déposez votre dossier en ligne, suivez l’avancement et recevez une réponse rapide. Vos données sont protégées et traitées en toute confidentialité.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep('conditions')}
                  className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                >
                  Faire une demande de prêt auto
                </button>
              </motion.div>
            )}

            {/* ...étapes suivantes inchangées... */}
            {currentStep === 'conditions' && (
              <motion.div
                key="conditions"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-4 text-gray-700">
                  Avant de commencer votre demande, merci de lire et accepter les conditions générales suivantes :
                </p>
                <div className="border p-4 mb-4 h-40 overflow-y-auto text-sm text-gray-600 bg-gray-50 rounded">
                  <p>• Vous devez fournir des informations exactes et complètes.</p>
                  <p>• Le prêt est soumis à validation de votre dossier.</p>
                  <p>• Les documents demandés sont obligatoires pour traitement.</p>
                  <p>• Les frais de dossier seront à régler à la fin du processus.</p>
                  <p>• Vous devez être majeur et résident en France.</p>
                  <p>• Le montant et la durée du prêt sont à définir selon votre situation.</p>
                  <p>• En cas de non-remboursement, des pénalités peuvent s'appliquer.</p>
                  <p>• Nous nous engageons à protéger vos données personnelles.</p>
                  <p>• Vous pouvez annuler votre demande à tout moment avant le paiement.</p>
                  <p>• Pour toute question, contactez notre service client.</p>
                  <p>• En cas de litige, le tribunal compétent sera celui de votre domicile.</p>
                  <p>• Nous nous réservons le droit de modifier ces conditions à tout moment.</p>
                </div>
                <label className="inline-flex items-center mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAccepted}
                    onChange={() => setIsAccepted(!isAccepted)}
                    className="form-checkbox h-5 w-5"
                  />
                  <span className="ml-2 text-gray-700">J'accepte les conditions générales</span>
                </label>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleAcceptConditions}
                    className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 'form' && (
              <motion.form
                key="form"
                onSubmit={handleSubmitForm}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                {/* ...formulaire inchangé... */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Type de prêt</label>
                  <input
                    type="text"
                    value="Prêt Automobile"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Nom complet</label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Adresse</label>
                  <input
                    type="text"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Code Postal</label>
                  <input
                    type="text"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Ville</label>
                  <input
                    type="text"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Montant souhaité (€)</label>
                  <input
                    type="number"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                    min={1}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-gray-700">Durée du prêt (mois)</label>
                  <input
                    type="number"
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                    min={1}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Suivant
                  </button>
                </div>
              </motion.form>
            )}

            {currentStep === 'documents' && (
              <motion.form
                key="documents"
                onSubmit={handleSubmitDocuments}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 p-4 bg-gray-100 rounded border border-gray-300 text-sm text-gray-700">
                  <strong>Documents obligatoires à joindre :</strong>
                  <ul className="list-disc ml-6 mt-2">
                    <li>Pièce d'identité (carte d'identité, passeport)</li>
                    <li>Justificatif de domicile de moins de 3 mois</li>
                    <li>Derniers bulletins de salaire ou preuve de revenus</li>
                    <li>Relevé d'identité bancaire (RIB)</li>
                  </ul>
                </div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Joignez vos documents (PDF, JPEG, PNG) - max {MAX_FILE_SIZE_MB} Mo chacun :
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,image/jpeg,image/png"
                  onChange={handleDocumentsChange}
                  className="mb-2"
                />
                {docError && (
                  <p className="mb-2 text-red-600 font-semibold">{docError}</p>
                )}
                {documents.length > 0 && (
                  <ul className="mb-4 text-gray-700 text-sm">
                    {documents.map((file, index) => (
                      <li key={index} className="flex items-center justify-between mb-1">
                        <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Suivant
                  </button>
                </div>
              </motion.form>
            )}

            {currentStep === 'summary' && (
              <motion.div
                key="summary"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6 px-4 sm:px-6 lg:px-8"
              >
                <h3 className="text-lg sm:text-xl font-bold text-blue-900">Récapitulatif de votre demande</h3>
                <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800">🧍 Informations personnelles</h4>
                  <p className="text-sm sm:text-base"><span className="font-medium">Nom complet :</span> {nom}</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Email :</span> {email}</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Téléphone :</span> {telephone}</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Adresse :</span> {adresse}</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Code Postal :</span> {codePostal}</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Ville :</span> {ville}</p>
                </div>
                <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800">💶 Détails du prêt</h4>
                  <p className="text-sm sm:text-base  text-yellow-500"><span className="font-medium text-gray-800">Type de prêt :</span> Prêt Automobile</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Montant souhaité :</span> {montant} €</p>
                  <p className="text-sm sm:text-base"><span className="font-medium">Durée du prêt :</span> {duree} mois</p>
                </div>
                <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800">📎 Documents joints</h4>
                  {documents.length === 0 ? (
                    <p className="text-red-600 text-sm sm:text-base">Aucun document joint</p>
                  ) : (
                    <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                      {documents.map((file, i) => (
                        <li key={i}>
                          {file.name} – {(file.size / 1024).toFixed(1)} KB
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm sm:text-base text-yellow-900 rounded">
                  Veuillez vérifier que toutes les informations ci-dessus sont correctes avant de valider votre demande.<br />
                  <span className="font-semibold">La suite de la procédure se fera par email.</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={sendFormData}
                    disabled={isSubmitting}
                    className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition text-sm sm:text-base"
                  >
                    {isSubmitting ? "Envoi..." : "✅ Envoyer la demande"}
                  </button>
                </div>
                {submitError && (
                  <p className="text-red-600 mt-2">{submitError}</p>
                )}
              </motion.div>
            )}

            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                {/* Numéro de dossier généré */}
                <p className="mb-2 text-sm text-gray-500">
                  Numéro de dossier : <span className="font-mono">{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </p>
                <h3 className="text-green-700 font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Demande envoyée avec succès !
                </h3>
                <p className="mb-4 text-gray-700">
                  Merci <span className="font-semibold">{nom || "!"}</span>, nous avons bien reçu votre demande.<br />
                  <span className="font-semibold flex items-center mt-2">
                    <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                    </svg>
                    La suite de la procédure se fera par email&nbsp;:
                    <a
                      href={`mailto:${email}`}
                      className="ml-1 text-blue-700 underline break-all"
                    >
                      {email || 'votre adresse email'}
                    </a>
                  </span>
                  <br />
                  <span className="block mt-2 text-sm text-gray-600">
                    Merci de vérifier votre boîte de réception (ainsi que les spams ou courriers indésirables) dans les prochaines minutes.<br />
                    Si vous ne recevez rien sous 24h, contactez notre support.<br />
                    <span className="block mt-2">
                      <strong>Délai estimé de traitement :</strong> sous 48h ouvrées.
                    </span>
                    <span className="block mt-2">
                      <a
                        href="mailto:support-contact@zofin.space"
                        className="text-blue-700 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contacter le support
                      </a>
                      {" "} | {" "}
                      <a
                        href="/faq"
                        className="text-blue-700 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Consulter la FAQ
                      </a>
                    </span>
                    <span className="block mt-2 text-xs text-gray-400">
                      Vos données sont traitées conformément à la réglementation RGPD et ne seront jamais partagées sans votre consentement.
                    </span>
                  </span>
                </p>
                <button
                  onClick={resetAll}
                  aria-label="Faire une nouvelle demande de prêt"
                  className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                >
                  Nouvelle demande
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini FAQ SEO en bas de page */}
          <section className="mt-10 max-w-lg w-full bg-white rounded shadow p-6" aria-label="FAQ Prêt Auto">
            <h2 className="text-xl font-bold text-yellow-700 mb-4">Questions fréquentes sur le prêt auto</h2>
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Quels sont les documents nécessaires pour un prêt auto ?</h3>
              <p className="text-gray-700 text-sm">Vous devez fournir une pièce d’identité, un justificatif de domicile, vos derniers bulletins de salaire et un RIB.</p>
            </div>
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Quel est le délai de réponse pour ma demande ?</h3>
              <p className="text-gray-700 text-sm">Vous recevez une réponse sous 48h ouvrées après dépôt de votre dossier complet.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Puis-je financer une voiture d’occasion ?</h3>
              <p className="text-gray-700 text-sm">Oui, notre prêt auto s’applique aussi bien aux véhicules neufs qu’aux véhicules d’occasion.</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PretAuto;