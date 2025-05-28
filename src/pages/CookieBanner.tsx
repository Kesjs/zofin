import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  const closeBanner = () => {
    setVisible(false);
  };

  const acceptCookies = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center animate-slide-up"
      aria-live="polite"
    >
      <div className="relative w-full max-w-3xl bg-white text-gray-900 px-6 py-6 shadow-xl border-t border-gray-200 rounded-t-lg">
        {/* Bouton fermeture en haut à droite */}
        <button
          onClick={closeBanner}
          aria-label="Fermer"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl focus:outline-none"
        >
          ❌
        </button>

        {/* Contenu texte */}
        <h2 className="text-base font-semibold flex items-center gap-2 mb-2">
          <span role="img" aria-label="cookie">🍪</span>
          Gestion des cookies
        </h2>

        <p className="mb-2">
          Nous utilisons des cookies pour assurer le bon fonctionnement et la sécurité de notre site de prêt en ligne, analyser la fréquentation et personnaliser votre expérience.
          <span role="img" aria-label="lock"> 🔒</span>
        </p>

        <p className="mb-2">
          Certains cookies tiers (ex : Google Analytics) peuvent être utilisés pour améliorer nos services.
          <span role="img" aria-label="chart"> 📊</span>
        </p>

        <p className="mb-2">
          Vous pouvez accepter ou refuser l’utilisation des cookies non essentiels à tout moment. Pour en savoir plus, consultez notre&nbsp;
          <Link to="/politique-de-confidentialite" className="underline text-blue-600 hover:text-blue-800">
            Politique de Confidentialité
          </Link>
          &nbsp;et nos&nbsp;
          <Link to="/conditions-utilisation" className="underline text-blue-600 hover:text-blue-800">
            Conditions d'utilisation
          </Link>
          .
        </p>

        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span role="img" aria-label="info">ℹ️</span>
          Votre consentement est modifiable à tout moment en bas de page.
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={acceptCookies}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            ✅ Accepter
          </button>
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slide-up {
            animation: slide-up 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
}