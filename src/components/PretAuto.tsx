/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'intro' | 'conditions' | 'form' | 'documents' | 'payment' | 'confirmation';

const stepTitles: Record<Step, string> = {
  intro: 'Bienvenue',
  conditions: 'Conditions Générales',
  form: 'Formulaire de demande',
  documents: 'Upload des documents',
  payment: 'Paiement',
  confirmation: 'Confirmation',
};

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const PretAuto: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');

  // Données globales du prêt
  const [isAccepted, setIsAccepted] = useState(false);
  const [nom, setNom] = useState('');
  const [montant, setMontant] = useState('');
  const [duree, setDuree] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [docError, setDocError] = useState('');

  // Animation variants pour framer-motion
  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  // Utiliser useCallback pour éviter recréation inutile
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'intro': return 'conditions';
        case 'conditions': return 'form';
        case 'form': return 'documents';
        case 'documents': return 'payment';
        case 'payment': return 'confirmation';
        default: return prev;
      }
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      switch (prev) {
        case 'confirmation': return 'payment';
        case 'payment': return 'documents';
        case 'documents': return 'form';
        case 'form': return 'conditions';
        case 'conditions': return 'intro';
        default: return prev;
      }
    });
  }, []);

  // Gestion conditions
  const handleAcceptConditions = () => {
    if (!isAccepted) {
      alert("Vous devez accepter les conditions pour continuer.");
      return;
    }
    nextStep();
  };

  // Validation formulaire demande
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !montant || !duree) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    nextStep();
  };

  // Gestion ajout fichiers (cumulatif)
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

  const handlePayment = () => {
    setPaymentConfirmed(true);
    nextStep();
  };

  const resetAll = () => {
    setIsAccepted(false);
    setNom('');
    setMontant('');
    setDuree('');
    setDocuments([]);
    setPaymentConfirmed(false);
    setDocError('');
    setCurrentStep('intro');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full p-6 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-4">Prêt Auto</h2>
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
                Bienvenue sur notre service de demande de prêt auto. Ce processus comporte plusieurs étapes pour garantir la validité de votre dossier.
              </p>

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900 mb-2">Roulez vers la liberté</h1>
          <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
          <p className="text-gray-700">
            Que vous souhaitiez acquérir un véhicule neuf ou d’occasion, le prêt auto est la solution idéale pour financer votre achat sans délai.
            Simplifiez vos démarches et repartez au volant de votre voiture en toute sérénité.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900 mb-2">Des conditions flexibles</h1>
          <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
          <p className="text-gray-700">
            Profitez d’un crédit auto à taux avantageux, avec des mensualités adaptées à votre budget. Que ce soit pour une voiture de ville, un SUV ou un véhicule utilitaire, 
            notre offre s’adapte à vos besoins spécifiques.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900 mb-2">Obtenez votre financement rapidement</h1>
          <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
          <p className="text-gray-700">
            Grâce à un processus de demande rapide et 100% en ligne, votre prêt peut être accordé en quelques jours seulement. 
            Passez à l’action sans attendre et réalisez votre projet automobile dès aujourd’hui.
          </p>
        </div>

              <button
                onClick={() => setCurrentStep('conditions')}
                className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
              >
                Faire une demande
              </button>
            </motion.div>
          )}

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

          {currentStep === 'payment' && (
            <motion.div
              key="payment"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4 text-gray-700">
                Veuillez procéder au paiement des frais de dossier pour que nous puissions traiter votre demande.
              </p>
              <p className="mb-6 font-semibold">
                Montant à payer : 50 € (frais fixes)
              </p>
              {!paymentConfirmed ? (
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handlePayment}
                    className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Payer 50 €
                  </button>
                </div>
              ) : (
                <p className="text-green-600 font-semibold">Paiement confirmé !</p>
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
              <h3 className="text-green-700 font-bold mb-4">Demande envoyée avec succès !</h3>
              <p className="mb-4 text-gray-700">
                Nous avons bien reçu votre demande. Vous serez contacté par email sous 48h.
              </p>
              <button
                onClick={resetAll}
                className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-yellow-500 transition"
  >
            Nouvelle demande
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
);
};

export default PretAuto;