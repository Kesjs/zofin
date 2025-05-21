// src/components/PretPro.tsx
import React, { useState } from 'react';

const PretPro: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [answers, setAnswers] = useState({ question1: '', question2: '' });
  const [showForm, setShowForm] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleSubmit = () => {
    if (isAccepted) {
      setModalOpen(false);
      setShowForm(true);
    } else {
      alert('Veuillez accepter les conditions avant de soumettre.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section id="pret-pro" className="pt-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-yellow-600 mb-4">Prêt Professionnel</h2>

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900 mb-2">Financement sur mesure</h1>
          <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
          <p className="text-gray-700">
            Que vous soyez entrepreneur, artisan, commerçant ou dirigeant de PME, le prêt professionnel vous accompagne 
            dans le développement de votre activité. Investissements matériels, trésorerie, aménagement ou lancement 
            d’un projet : nous vous proposons une solution adaptée à vos besoins réels.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900 mb-2">Soutenez la croissance de votre entreprise</h1>
          <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
          <p className="text-gray-700">
            Développer son entreprise nécessite souvent des ressources financières importantes. Le crédit professionnel 
            permet de financer des équipements, des véhicules, l’achat de stocks ou même l’embauche de nouveaux collaborateurs.
            Avec des modalités souples et personnalisables, vous gardez le contrôle de vos engagements.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900 mb-2">Un accompagnement rapide et efficace</h1>
          <div className="border-t-4 border-yellow-500 w-16 mb-4"></div>
          <p className="text-gray-700">
            Nos conseillers vous accompagnent tout au long de votre demande de prêt professionnel. L’étude de votre dossier 
            est rapide, et la réponse peut intervenir sous quelques jours. Gagnez du temps et concentrez-vous sur l’essentiel : 
            votre activité.
          </p>
        </div>

        <a
          onClick={toggleModal}
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition cursor-pointer"
        >
          Faire une demande
        </a>
      </section>

      {/* 🔐 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-2xl font-semibold mb-4">Conditions Générales</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Quel est l'objet du financement ?</label>
                <input
                  type="text"
                  name="question1"
                  value={answers.question1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Disposez-vous de documents comptables ?</label>
                <input
                  type="text"
                  name="question2"
                  value={answers.question2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    checked={isAccepted}
                    onChange={() => setIsAccepted(!isAccepted)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">J'accepte les conditions générales</span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
              >
                Passer au formulaire
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                Fermer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 📄 Formulaire de demande */}
      {showForm && (
        <section className="bg-white p-8 rounded shadow-lg max-w-xl mx-auto mt-8">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Formulaire de Demande de Prêt Professionnel</h3>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Type de prêt</label>
              <input
                type="text"
                value="Prêt Professionnel"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Nom de l'entreprise</label>
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
        </section>
      )}
    </>
  );
};

export default PretPro;
