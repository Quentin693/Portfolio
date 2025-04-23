"use client";

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Linkedin, Github } from 'lucide-react';


interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message?: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to: ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simuler un envoi de formulaire
    try {
      // En production, remplacez par votre logique d'envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation d'une réponse réussie
      setSubmitStatus({
        success: true,
        message: "Votre message a été envoyé avec succès!"
      });
      
      // Réinitialiser le formulaire après un envoi réussi
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      setSubmitStatus({
        success: false,
        message: "Une erreur s'est produite lors de l'envoi du message."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Me Contacter
      </h2>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Sidebar avec infos de contact */}
          <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 relative inline-block">
                Coordonnées
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-white/40 rounded"></span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Email</p>
                    <p className="font-medium">cialonequentin@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Téléphone</p>
                    <p className="font-medium">+33 6 62 49 54 24</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm opacity-75">Localisation</p>
                    <p className="font-medium">Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Retrouvez-moi sur</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/quentin-cialone-6b3003271/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer z-10 relative active:bg-white/30"
                   onClick={(e) => {
                     e.stopPropagation();
                     window.open("https://www.linkedin.com/in/quentin-cialone-6b3003271/", "_blank");
                   }}
                   aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/Quentin693" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer z-10 relative active:bg-white/30"
                   onClick={(e) => {
                     e.stopPropagation();
                     window.open("https://github.com/Quentin693", "_blank");
                   }}
                   aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="md:w-3/5 p-8 relative z-20">
            <h3 className="text-2xl font-bold mb-6 relative inline-block">
              Envoyez-moi un message
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500/40 rounded"></span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-30">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 ml-1">
                    Nom
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text relative z-40" 
                    required
                    autoComplete="name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 ml-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text relative z-40" 
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1 ml-1">
                  Sujet
                </label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text relative z-40" 
                  required
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 ml-1">
                  Message
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onClick={(e) => e.stopPropagation()}
                  rows={5} 
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none cursor-text relative z-40"
                  required
                ></textarea>
              </div>
              
              {submitStatus && (
                <div className={`p-3 rounded-lg ${submitStatus.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center relative z-40 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;