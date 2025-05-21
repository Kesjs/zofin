import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PretAuto: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleSubmit = () => {
    if (isAccepted) {
      setModalOpen(false);
      setTimeout(() => setShowForm(true), 300); // délai pour une meilleure transition
    } else {
      alert("Veuillez accepter les conditions avant de soumettre.");
    }
  };

  return (
    <>
      <section id="pret-auto" className="pt-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4">Prêt Auto</h2>

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
          onClick={toggleModal}
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          Faire une demande
        </button>
      </section>

      {/* Modal avec conditions */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded w-96 shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-4">Conditions Générales</h2>
              <div className="max-h-40 overflow-y-auto mb-4 text-sm text-gray-700 border p-3 rounded">
                <p>
                  En faisant une demande de prêt auto, vous acceptez que vos données soient traitées dans le cadre de l’étude de votre dossier.
                  Vous vous engagez à fournir des informations exactes et à respecter les délais de remboursement fixés par le contrat de prêt.
                  Toute fausse déclaration peut entraîner un refus du dossier. Consultez nos conditions de confidentialité pour plus d'informations.
                </p>
              </div>
              <label className="inline-flex items-center mb-4 text-gray-700">
                <input
                  type="checkbox"
                  checked={isAccepted}
                  onChange={() => setIsAccepted(!isAccepted)}
                  className="form-checkbox"
                />
                <span className="ml-2">J'accepte les conditions générales</span>
              </label>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
                >
                  Continuer
                </button>
                <button
                  onClick={toggleModal}
                  className="ml-3 text-gray-500 hover:text-gray-700"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulaire avec animation */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded shadow-lg max-w-xl mx-auto mt-8"
          >
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Formulaire de Demande - Prêt Auto</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Type de prêt</label>
                <input
                  type="text"
                  value="Prêt Auto"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Nom Complet</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Montant souhaité (€)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Durée du prêt (mois)</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>

              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-blue-900 transition"
              >
                Envoyer la demande
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default PretAuto;
