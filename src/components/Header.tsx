/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiGmail } from 'react-icons/si';


const creditOffers = [
  { title: 'Prêt Personnel', href: '/nos-offres/pret-personnel' },
  { title: 'Prêt Immobilier', href: '/nos-offres/pret-immobilier' },
  { title: 'Prêt Auto', href: '/nos-offres/pret-auto' },
  { title: 'Prêt Professionnel', href: '/nos-offres/pret-pro' },
];

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleNosOffresClick = () => {
    setIsContentVisible(!isContentVisible);
    setShowDropdown(false);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  function isActiveLink(to: string) {
    return currentPath === to;
  }

  return (
    <>
      <header className="fixed w-full bg-white shadow-md z-50" role="navigation" aria-label="Navigation principale">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="https://img.icons8.com/ios-filled/50/eab308/topup-payment.png"
                  alt="Logo Zofin - Service de prêt"
                  className="w-8 h-8"
                  loading="eager"
                />
                <span className="text-2xl font-bold text-yellow-500">Zofin</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <HashLink
                smooth
                to="/#hero"
                className={`transition-colors ${
                  isActiveLink('/#hero')
                    ? 'text-yellow-600 font-semibold underline'
                    : 'text-gray-600 hover:text-yellow-500'
                }`}
              >
                Accueil
              </HashLink>
              <HashLink
                smooth
                to="/#services"
                className={`transition-colors ${
                  isActiveLink('/#services')
                    ? 'text-yellow-600 font-semibold underline'
                    : 'text-gray-600 hover:text-yellow-500'
                }`}
              >
                Services
              </HashLink>
              <HashLink
                smooth
                to="/#about"
                className={`transition-colors ${
                  isActiveLink('/#about')
                    ? 'text-yellow-600 font-semibold underline'
                    : 'text-gray-600 hover:text-yellow-500'
                }`}
              >
                À propos
              </HashLink>
              <HashLink
                smooth
                to="/#contact"
                className={`transition-colors ${
                  isActiveLink('/#contact')
                    ? 'text-yellow-600 font-semibold underline'
                    : 'text-gray-600 hover:text-yellow-500'
                }`}
              >
                Contact
              </HashLink>

              {/* Nos offres crédit dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <motion.button
                  className={`flex items-center transition-all ${
                    location.pathname.startsWith('/nos-offres')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNosOffresClick}
                  aria-label="Voir les offres de crédit"
                >
                  Nos offres crédit <ChevronDown className="ml-1 w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {showDropdown && !isContentVisible && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bg-white mt-2 shadow-xl rounded-lg py-2 w-56 z-50"
                    >
                      {creditOffers.map((offer, index) => (
                        <li key={index}>
                          <Link
                            to={offer.href}
                            className={`block px-4 py-2 transition-all ${
                              location.pathname === offer.href
                                ? 'bg-yellow-200 text-yellow-600 font-semibold'
                                : 'text-gray-800 hover:bg-yellow-200 hover:text-yellow-600'
                            }`}
                            onClick={() => setShowDropdown(false)}
                            aria-label={offer.title}
                          >
                            {offer.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </nav>
{/* Email Desktop */}
<motion.div
  className="hidden md:flex items-center"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  <a
    href="mailto:support-contact@zofin.space"
    className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition-colors ml-4"
    aria-label="Contact Email"
  >
    <SiGmail className="w-5 h-5 mr-2" />
    <span>Email</span>
  </a>
</motion.div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-yellow-500"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                tabIndex={0}
                onKeyDown={handleMenuKeyDown}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute left-0 right-0 top-20 bg-white bg-opacity-95 shadow-lg z-40 hover:bg-gray-100"
            >
              <div className="space-y-4 px-4 py-4 flex flex-col items-center">
                <HashLink
                  smooth
                  to="/#hero"
                  className={`block transition-colors ${
                    isActiveLink('/#hero')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </HashLink>
                <HashLink
                  smooth
                  to="/#services"
                  className={`block transition-colors ${
                    isActiveLink('/#services')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </HashLink>
                <HashLink
                  smooth
                  to="/#about"
                  className={`block transition-colors ${
                    isActiveLink('/#about')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  À propos
                </HashLink>
                <HashLink
                  smooth
                  to="/#contact"
                  className={`block transition-colors ${
                    isActiveLink('/#contact')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </HashLink>

                {/* Nos offres mobile */}
                <motion.button
                  className={`flex items-center transition-all ${
                    location.pathname.startsWith('/nos-offres')
                      ? 'text-yellow-600 font-semibold underline'
                      : 'text-gray-600 hover:text-yellow-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNosOffresClick}
                  aria-label="Voir les offres de crédit"
                >
                  Nos offres crédit <ChevronDown className="ml-1 w-4 h-4" />
                </motion.button>

                {isContentVisible && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 shadow-xl rounded-lg py-2 w-full"
                  >
                    {creditOffers.map((offer, index) => (
                      <li key={index}>
                        <Link
                          to={offer.href}
                          className={`block px-4 py-2 transition-all ${
                            location.pathname === offer.href
                              ? 'bg-yellow-200 text-yellow-600 font-semibold'
                              : 'text-gray-700 hover:bg-yellow-100 hover:text-yellow-600'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                          aria-label={offer.title}
                        >
                          {offer.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

   {/* Email flottant mobile */}
<motion.a
  href="mailto:support-contact@zofin.space"
  aria-label="Contact via Email"
  initial={{ scale: 1 }}
  whileHover={{ scale: 1.1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="
    fixed bottom-5 right-5 z-50 
    bg-yellow-400 text-black 
    p-3 rounded-full 
    shadow-lg
    flex items-center justify-center
    w-12 h-12
    md:hidden
    cursor-pointer
  "
>
  <SiGmail className="w-6 h-6" />
</motion.a>

    </>
  );
}
