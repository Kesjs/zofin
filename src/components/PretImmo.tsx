/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

type Step = 'intro' | 'conditions' | 'form' | 'documents' | 'summary' | 'confirmation';

const LOCAL_STORAGE_KEY = 'pretImmoData';

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const PretImmo: React.FC = () => {
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

  // SEO : Script JSON-LD pour la FAQ
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quels sont les documents nécessaires pour une demande de prêt immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vous devez fournir une pièce d'identité, un justificatif de domicile de moins de 3 mois, vos derniers bulletins de salaire ou preuve de revenus, et un relevé d'identité bancaire (RIB)."
          }
        },
        {
          "@type": "Question",
          "name": "Combien de temps faut-il pour obtenir une réponse à ma demande de prêt immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le délai de traitement est généralement de 48h ouvrées après réception de votre dossier complet."
          }
        },
        {
          "@type": "Question",
          "name": "Comment suivre l’avancement de ma demande de prêt immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vous recevrez toutes les informations par email. Si besoin, contactez notre support ou consultez la FAQ."
          }
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Fonction d'envoi du formulaire à votre script PHP
  const sendFormData = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('typePret', 'Prêt Immobilier');
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
    <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4" aria-label="Demande de prêt immobilier">
      <article className="max-w-lg w-full p-6 bg-white rounded shadow-lg" aria-labelledby="pret-immo-titre">
        <header>
          <h1 id="pret-immo-titre" className="text-3xl font-bold text-yellow-600 mb-4" tabIndex={0}>
            Demande de Prêt Immobilier en Ligne – Simulation & Dossier
          </h1>
          <ProgressBar currentStep={currentStep} />
        </header>
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.section
              key="intro"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              aria-labelledby="pret-immo-intro"
            >
              <h2 id="pret-immo-intro" className="sr-only">Introduction au prêt immobilier</h2>
              <p className="text-gray-700 mb-6">
                Bienvenue sur notre service de <strong>demande de prêt immobilier</strong>. Ce processus comporte plusieurs étapes pour garantir la validité de votre dossier.
              </p>
              <section className="mb-6" aria-labelledby="pret-immo-avantages">
                <h3 id="pret-immo-avantages" className="text-xl font-semibold text-blue-900 mb-2">🏡 Concrétisez votre rêve immobilier</h3>
                <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
                <p className="text-gray-700">
                  Que ce soit pour l'achat d'une maison, d'un appartement ou pour la construction de votre future résidence,
                  notre <strong>prêt immobilier</strong> vous accompagne à chaque étape. Bénéficiez de conditions flexibles et adaptées à votre budget.
                </p>
              </section>
              <section className="mb-6" aria-labelledby="pret-immo-profil">
                <h3 id="pret-immo-profil" className="text-xl font-semibold text-blue-900 mb-2">👤 Une solution adaptée à votre profil</h3>
                <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
                <p className="text-gray-700">
                  Nous analysons votre situation financière pour vous proposer une <strong>offre personnalisée</strong>, que vous soyez primo-accédant, investisseur ou en projet de résidence secondaire.
                  Avec des taux compétitifs et un accompagnement expert, avancez sereinement dans votre projet.
                </p>
              </section>
              <section className="mb-6" aria-labelledby="pret-immo-rapide">
                <h3 id="pret-immo-rapide" className="text-xl font-semibold text-blue-900 mb-2">⚡ Un accompagnement clair et rapide</h3>
                <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
                <p className="text-gray-700">
                  De la <strong>simulation de prêt immobilier</strong> au déblocage des fonds, notre processus est transparent et rapide.
                  Nos conseillers sont à votre disposition pour répondre à toutes vos questions et vous aider à franchir chaque étape avec confiance.
                </p>
              </section>
              <button
                onClick={() => setCurrentStep('conditions')}
                className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                aria-label="Commencer la demande de prêt immobilier"
              >
                Faire une demande
              </button>
            </motion.section>
          )}

          {currentStep === 'conditions' && (
            <motion.section
              key="conditions"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              aria-labelledby="pret-immo-conditions"
            >
              <h2 id="pret-immo-conditions" className="sr-only">Conditions générales du prêt immobilier</h2>
              <p className="mb-4 text-gray-700">
                Avant de commencer votre demande, merci de lire et accepter les conditions générales suivantes :
              </p>
              <div className="border p-4 mb-4 h-40 overflow-y-auto text-sm text-gray-600 bg-gray-50 rounded" aria-label="Conditions générales">
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
                  aria-checked={isAccepted}
                  aria-label="J'accepte les conditions générales"
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
            </motion.section>
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
              aria-labelledby="pret-immo-formulaire"
            >
              <h2 id="pret-immo-formulaire" className="sr-only">Formulaire de demande de prêt immobilier</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Type de prêt</label>
                <input
                  type="text"
                  value="Prêt Immobilier"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                  aria-readonly="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
                  aria-required="true"
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
              aria-labelledby="pret-immo-documents"
            >
              <h2 id="pret-immo-documents" className="sr-only">Documents obligatoires pour le prêt immobilier</h2>
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
                aria-describedby="doc-help"
              />
              <span id="doc-help" className="sr-only">
                Formats acceptés : PDF, JPEG, PNG. Taille maximale : {MAX_FILE_SIZE_MB} Mo par fichier.
              </span>
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
                        aria-label={`Supprimer le document ${file.name}`}
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
            <motion.section
              key="summary"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6 px-4 sm:px-6 lg:px-8"
              aria-labelledby="recapitulatif-demande"
            >
              <h2 id="recapitulatif-demande" className="text-lg sm:text-xl font-bold text-blue-900">
                Récapitulatif de votre demande de prêt immobilier
              </h2>
              <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                <h3 className="text-md font-semibold mb-2 text-gray-800">🧍 Informations personnelles</h3>
                <p className="text-sm sm:text-base"><span className="font-medium">Nom complet :</span> {nom}</p>
                <p className="text-sm sm:text-base"><span className="font-medium">Email :</span> {email}</p>
                <p className="text-sm sm:text-base"><span className="font-medium">Téléphone :</span> {telephone}</p>
                <p className="text-sm sm:text-base"><span className="font-medium">Adresse :</span> {adresse}</p>
                <p className="text-sm sm:text-base"><span className="font-medium">Code Postal :</span> {codePostal}</p>
                <p className="text-sm sm:text-base"><span className="font-medium">Ville :</span> {ville}</p>
              </div>
              <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                <h3 className="text-md font-semibold mb-2 text-gray-800">🏠 Détails du prêt immobilier</h3>
                <p className="text-sm sm:text-base"><span className="font-medium">Montant souhaité :</span> {montant} €</p>
                <p className="text-sm sm:text-base"><span className="font-medium">Durée du prêt :</span> {duree} mois</p>
              </div>
              <div className="bg-gray-50 border rounded-lg shadow-sm p-4">
                <h3 className="text-md font-semibold mb-2 text-gray-800">📎 Documents joints</h3>
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
                  aria-label="Envoyer la demande de prêt immobilier"
                >
                  {isSubmitting ? "Envoi..." : "✅ Envoyer la demande"}
                </button>
              </div>
              {submitError && (
                <p className="text-red-600 mt-2">{submitError}</p>
              )}
            </motion.section>
          )}

          {currentStep === 'confirmation' && (
            <motion.section
              key="confirmation"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              aria-labelledby="confirmation-demande"
            >
              <h2 id="confirmation-demande" className="sr-only">Confirmation de la demande de prêt immobilier</h2>
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
            </motion.section>
          )}
        </AnimatePresence>

        {/* FAQ ciblée SEO */}
        <section aria-labelledby="faq-pret-immo" className="mt-8">
          <h2 id="faq-pret-immo" className="text-xl font-bold text-blue-900 mb-4">FAQ – Prêt Immobilier</h2>
          <dl>
            <dt className="font-semibold text-gray-800 mt-4">
              Quels sont les documents nécessaires pour une demande de prêt immobilier ?
            </dt>
            <dd className="ml-4 text-gray-700">
              Vous devez fournir une pièce d'identité, un justificatif de domicile de moins de 3 mois, vos derniers bulletins de salaire ou preuve de revenus, et un relevé d'identité bancaire (RIB).
            </dd>
            <dt className="font-semibold text-gray-800 mt-4">
              Combien de temps faut-il pour obtenir une réponse à ma demande de prêt immobilier ?
            </dt>
            <dd className="ml-4 text-gray-700">
              Le délai de traitement est généralement de 48h ouvrées après réception de votre dossier complet.
            </dd>
            <dt className="font-semibold text-gray-800 mt-4">
              Comment suivre l’avancement de ma demande de prêt immobilier ?
            </dt>
            <dd className="ml-4 text-gray-700">
              Vous recevrez toutes les informations par email. Si besoin, contactez notre support ou consultez la FAQ.
            </dd>
          </dl>
        </section>
      </article>
    </main>
  );
};

export default PretImmo;