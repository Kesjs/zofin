import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Message envoyé !');
    setTimeout(() => setFormStatus(''), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-yellow-100 via-white to-yellow-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-yellow-800 mb-4">Contactez-nous</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un projet ? Une question ? Notre équipe vous répond avec réactivité et professionnalisme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-yellow-800">Téléphone</h3>
                <p className="text-gray-600">+229 0197914922</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-yellow-800">Email</h3>
                <p className="text-gray-600">contact@finance-services.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-yellow-800">Adresse</h3>
                <p className="text-gray-600">42 Avenue de la Marina,75008 Cotonou</p>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center font-semibold shadow-md"
              >
                Envoyer
                <Send className="w-5 h-5 ml-2" />
              </motion.button>

              {formStatus && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center font-medium"
                >
                  {formStatus}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
