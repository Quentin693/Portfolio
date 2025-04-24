"use client";

import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, MapPin, Calendar, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface TimelineItem {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  description: string;
  type: 'education' | 'experience' | 'achievement';
  details: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const About: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Données du parcours (combiné mais triées par date) avec images
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "Baccalauréat Scientifique",
      subtitle: "Lycée Chalie Chaplin",
      period: "2017-2020",
      location: "Decines, France",
      description: "Spécialité Mathématiques, Mention Assez Bien",
      type: "education",
      details: [
        "J'ai acquis de solides bases en mathématiques et en sciences",
        "Découverte des bases de l'algorithmique"
      ],
    },
    {
      id: 2,
      title: "Licence Mathématique-Informatique",
      subtitle: "Université Claude Bernard Lyon 1",
      period: "2020 - 2022",
      location: "Villeurbanne, France",
      description: "Spécialisation en mathématiques appliquées et informatique",
      type: "education",
      details: [
        "Apprentissage langages de programmation PHP, HTML, CSS, C++",
        "Apprentissage des mathématiques appliquées",
        "Travail en équipe",
      ],
    },
    {
      id: 3,
      title: "École d'informatique",
      subtitle: "Epitech",
      period: "2022 - 2025",
      location: "Lyon, France",
      description: "Formation par projets en informatique",
      type: "education",
      details: [
        "Réalisation de plus de 40 projets informatiques",
        "Spécialisation en développement full-stack",
        "Membre de la junior entreprise",
      ],
    },
    {
      id: 4,
      title: "Stage - Développeur Frontend",
      subtitle: "INSA Lyon",
      period: "Septembre 2023 - Décembre 2023",
      location: "Lyon, France",
      description: "Développement d'interfaces utilisateur modernes",
      type: "experience",
      details: [
        "Refonte complète de l'interface utilisateur avec React",
        "Optimisation des performances de l'application web",
        "Implémentation d'un design system cohérent",
        "Apprentissage des bonnes pratiques en entreprise"
      ],
      images: [
        {
          src: "/Insa.png",
          alt: "Projet Frontend",
          caption: "Page d'accueil de l'application web"
        },
        {
          src: "/Insa1.png", 
          alt: "Projet Frontend",
          caption: "Interface que j'ai développée pendant mon stage"
        },
        {
          src: "/Insa2.png",
          alt: "Projet Frontend",
          caption: "Interface que j'ai développée pendant mon stage"
        },
      ]
    },
    {
      id: 5,
      title: "Junior Conseil Taker",
      subtitle: "Taker",
      period: " Juin 2023 - Aujourd'hui",
      location: "Lyon, France",
      description: "Chargé d'affaires & Responsable de la Taker Academy",
      type: "experience",
      details: [
        "Gestion de projets clients en équipe",
        "Développement de la Taker Academy",
        "Gestion de prospection et de communication",
        "Formation de nouveaux membres"
      ],
      images: [
        {
          src: "/Taker1.jpeg",
          alt: "Équipe Taker",
          caption: "Notre équipe lors d'un événement"
        },
        {
            src: "/Taker2.jpeg",
            alt: "Equipe Taker",
            caption: "Notre équipe lors d'un événement"
        }
      ]
    },
    {
      id: 6,
      title: "Développeur Fullstack",
      subtitle: "Reactime",
      period: "Avril 2025 - Juillet 2025",
      location: "Lyon, France",
      description: "Site internet du restaurant Tiki Au bord de l'eau",
      type: "experience",
      details: [
        "Développement du site avec Next.js et Tailwind CSS, Nest.js et PostgreSQL",
        "Methode Agile",
        "Au bureau et sur le terrain",
      ],
      images: [
        {
          src: "/ProjetTiki.png",
          alt: "Projet Tiki",
          caption: "Un des projets développés chez Reactime"
        },
        {
          src: "/ProjetTiki1.png",
          alt: "Réservation en ligne",
          caption: "Interface de réservation en ligne"
        },
        {
          src: "/ProjetTiki2.png",
          alt: "Interface de connexion",
          caption: "Interface de connexion à l'application"
        }
      ]
    },
  ];

  // Fonction pour afficher l'icône appropriée selon le type d'élément
  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="text-blue-400" />;
      case 'experience':
        return <Briefcase className="text-green-400" />;
      case 'achievement':
        return <Award className="text-yellow-400" />;
      default:
        return <MapPin className="text-purple-400" />;
    }
  };

  // Fonction pour obtenir la couleur de fond selon le type d'élément
  const getCardColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'from-blue-600/20 to-blue-800/20 border-blue-500/30';
      case 'experience':
        return 'from-green-600/20 to-green-800/20 border-green-500/30';
      case 'achievement':
        return 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30';
      default:
        return 'from-purple-600/20 to-purple-800/20 border-purple-500/30';
    }
  };

  // Gestion du clic sur une carte
  const handleCardClick = (item: TimelineItem) => {
    if (selectedItem?.id === item.id) {
      // Si on clique sur l'élément déjà sélectionné, on le ferme
      closeDetail();
    } else {
      // Sinon, on ouvre le détail avec animation
      setAnimating(true);
      
      // Si un élément est déjà ouvert, on le ferme d'abord
      if (selectedItem) {
        setSelectedItem(null);
        setTimeout(() => {
          setSelectedItem(item);
          setTimeout(() => setAnimating(false), 500);
        }, 300);
      } else {
        setSelectedItem(item);
        setTimeout(() => setAnimating(false), 500);
      }
    }
  };

  // Fermeture du détail
  const closeDetail = () => {
    setAnimating(true);
    setSelectedItem(null);
    setTimeout(() => setAnimating(false), 300);
  };

  // Ouverture d'une image en plein écran
  const openFullscreenImage = (src: string) => {
    setSelectedImage(src);
  };

  // Fermeture de l'image en plein écran
  const closeFullscreenImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Mon Parcours
      </h2>

      <div className="flex items-center justify-center space-x-12 mb-8">
        <div className="flex items-center">
        <div className="bg-green-500/20 p-2 rounded-full mr-2">
            <Briefcase className="text-green-400" />
          </div>
          <span className="font-medium">Expérience</span>
        </div>
        <div className="flex items-center">
          
        <div className="bg-blue-500/20 p-2 rounded-full mr-2">
            <GraduationCap className="text-blue-400" />
          </div>
          <span className="font-medium">Formation</span>
        </div>
      </div>

      {/* Timeline avec chemin */}
      <div className="relative">
        {/* Ligne du chemin */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full"></div>

        {/* Cartes de parcours */}
        <div className="space-y-24 relative">
          {timelineItems.map((item) => (
            <div 
              key={item.id} 
              className={`relative flex justify-center ${item.type === 'education' ? 'md:justify-end' : 'md:justify-start'}`}
            >
              {/* Connecteur au chemin central */}
              <div className="hidden md:block absolute top-10 w-1/3 border-t-2 border-dashed border-gray-600 z-0" 
                  style={{ 
                    [item.type === 'education' ? 'right' : 'left']: '50%' 
                  }}
              />
              
              {/* Point sur la timeline avec couleur selon le type */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-800 border-2 ${
                item.type === 'education' ? 'border-blue-500' : 'border-green-500'
              } z-10`}>
                <div className={`w-full h-full rounded-full ${
                  item.type === 'education' ? 'bg-blue-500' : 'bg-green-500'
                } animate-ping opacity-20`}></div>
              </div>

              {/* Carte */}
              <div 
                className={`relative md:w-5/12 z-10 cursor-pointer transform transition-all duration-300 hover:scale-105 
                            ${item.type === 'education' ? 'md:mr-20' : 'md:ml-20'}`}
                onClick={() => handleCardClick(item)}
              >
                <div className={`bg-gradient-to-br ${getCardColor(item.type)} p-6 rounded-xl shadow-lg border backdrop-blur-sm`}>
                  <div className="flex items-start justify-between">
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mt-4">{item.title}</h3>
                  <p className="text-gray-300">{item.subtitle}</p>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-400">
                    <MapPin size={14} className="mr-1" />
                    <span>{item.location}</span>
                  </div>
                  
                  <p className="mt-3 text-gray-300">{item.description}</p>

                  {/* Indicateur d'images si disponibles */}
                  {item.images && item.images.length > 0 && (
                    <div className="flex items-center mt-3 text-sm text-gray-400">
                      <ImageIcon size={14} className="mr-1" />
                      <span>{item.images.length} image{item.images.length > 1 ? 's' : ''} disponible{item.images.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour afficher les détails */}
      {selectedItem && (
        <div 
          className={`fixed inset-0 flex items-center justify-center z-50 px-4 ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeDetail}></div>
          
          <div 
            className={`bg-gray-800 rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 border-2 ${
              selectedItem.type === 'education' ? 'border-blue-500/30' : 'border-green-500/30'
            } transform transition-all duration-500 
                      ${animating ? 'scale-95' : 'scale-100'}`}
          >
            <button 
              onClick={closeDetail}
              className="absolute top-4 right-4 bg-gray-700 rounded-full p-1 hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center mb-6">
              <div className="bg-gray-700 p-3 rounded-lg mr-4">
                {getIcon(selectedItem.type)}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-gray-300">{selectedItem.subtitle}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap mb-6 text-sm">
              <div className="flex items-center mr-6 mb-2">
                <Calendar size={16} className="mr-1 text-blue-400" />
                <span>{selectedItem.period}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPin size={16} className="mr-1 text-green-400" />
                <span>{selectedItem.location}</span>
              </div>
            </div>
            
            <p className="text-lg mb-6">{selectedItem.description}</p>
            
            <div className="space-y-6">
              {/* Section détails */}
              <div>
                <h4 className={`font-semibold ${
                  selectedItem.type === 'education' ? 'text-blue-400' : 'text-green-400'
                } mb-2`}>En détail :</h4>
                <ul className="space-y-2">
                  {selectedItem.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`mr-2 ${
                        selectedItem.type === 'education' ? 'text-blue-400' : 'text-green-400'
                      }`}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Section images */}
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="mt-6">
                  <h4 className={`font-semibold ${
                    selectedItem.type === 'education' ? 'text-blue-400' : 'text-green-400'
                  } mb-3`}>
                    <div className="flex items-center">
                      <ImageIcon size={16} className="mr-2" />
                      <span>Images :</span>
                    </div>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItem.images.map((image) => (
                      <div key={image.src} className="relative group">
                        <div 
                          className="relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 group-hover:scale-[1.02] h-48"
                          onClick={() => openFullscreenImage(image.src)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3 z-10">
                            <span className="text-white text-sm">Cliquez pour agrandir</span>
                          </div>
                          <Image 
                            src={image.src} 
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover rounded-lg"
                          />
                        </div>
                        {image.caption && (
                          <p className="text-sm text-gray-400 mt-1 text-center">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal pour afficher l'image en plein écran */}
      {selectedImage && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[60] bg-black/90 backdrop-blur-sm"
          onClick={closeFullscreenImage}
        >
          <button 
            onClick={closeFullscreenImage}
            className="absolute top-6 right-6 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>
          
          <div className="max-w-[90vw] max-h-[90vh] relative">
            <Image 
              src={selectedImage} 
              alt="Image en plein écran"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;