import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DemandePret = () => {
  const [formData, setFormData] = useState({
    type: "",
    montant: "",
    duree: "",
    nom: "",
    email: "",
    telephone: "",
  });

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromURL = queryParams.get("type");
    if (typeFromURL) {
      setFormData((prev) => ({ ...prev, type: typeFromURL }));
    }
  }, [location.search]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demande envoyée :", formData);
    alert("Votre demande de prêt a été envoyée !");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Formulaire de demande de prêt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Choisissez un type de prêt</option>
            <option value="Prêt Personnel">Prêt Personnel</option>
            <option value="Prêt Immobilier">Prêt Immobilier</option>
            <option value="Prêt Auto">Prêt Auto</option>
            <option value="Prêt Professionnel">Prêt Professionnel</option>
          </select>

          <input
            type="number"
            name="montant"
            placeholder="Montant souhaité (€)"
            value={formData.montant}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="duree"
            placeholder="Durée de remboursement (en mois ou années)"
            value={formData.duree}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="nom"
            placeholder="Votre nom complet"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre adresse email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="tel"
            name="telephone"
            placeholder="Votre numéro de téléphone"
            value={formData.telephone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Soumettre la demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemandePret;
