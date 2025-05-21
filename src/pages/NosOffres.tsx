import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdAttachMoney, MdWork } from 'react-icons/md'; // Material Design Icons
import { BiCar } from 'react-icons/bi'; // Bootstrap Icons

export default function NosOffres() {
  return (
        <section id="nos-offres" className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800">

    <div id="nos-offres" className="pt-28 px-6">
      <h2 className="text-3xl font-bold mb-8 text-yellow-600 text-center">Nos Offres de Crédit</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Prêt Personnel */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex justify-center mb-4">
            <MdHome className="text-yellow-500 text-4xl" /> {/* Icône Material Design Home */}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Prêt Personnel</h3>
          <p className="text-gray-700 mb-4">
            Obtenez un financement personnalisé pour vos projets personnels. Ce prêt peut couvrir tous vos besoins, des projets de voyage à l'achat de biens de consommation.
          </p>
          <Link to="/nos-offres/pret-personnel">
            <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">Lire plus</span>
          </Link>
        </div>

        {/* Prêt Immobilier */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex justify-center mb-4">
            <MdAttachMoney className="text-yellow-500 text-4xl" /> {/* Icône Material Design Cash */}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Prêt Immobilier</h3>
          <p className="text-gray-700 mb-4">
            Réalisez votre rêve immobilier avec des conditions flexibles. Découvrez des solutions adaptées à chaque étape de votre projet immobilier.
          </p>
          <Link to="/nos-offres/pret-immobilier">
            <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">Lire plus</span>
          </Link>
        </div>

        {/* Prêt Auto */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex justify-center mb-4">
            <BiCar className="text-yellow-500 text-4xl" /> {/* Icône Bootstrap Car */}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Prêt Auto</h3>
          <p className="text-gray-700 mb-4">
            Financer l’achat de votre véhicule neuf ou d’occasion en toute simplicité. Trouvez l'option qui vous convient pour rouler en toute sérénité.
          </p>
          <Link to="/nos-offres/pret-auto">
            <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">Lire plus</span>
          </Link>
        </div>

        {/* Prêt Professionnel */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <div className="flex justify-center mb-4">
            <MdWork className="text-yellow-500 text-4xl" /> {/* Icône Material Design Work */}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Prêt Professionnel</h3>
          <p className="text-gray-700 mb-4">
            Offrez à votre entreprise le financement dont elle a besoin pour grandir. Découvrez nos solutions de crédit pro adaptées à votre secteur d'activité.
          </p>
          <Link to="/nos-offres/pret-pro">
            <span className="text-yellow-600 font-semibold cursor-pointer hover:underline">Lire plus</span>
          </Link>
        </div>
        
      </div>
    </div>
    </section>
  );
}
