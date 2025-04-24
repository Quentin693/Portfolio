"use client";

import React, { useState, useCallback } from 'react';
import { Github, ExternalLink, X, Code, LayoutDashboard, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import BackButton from './BackButton';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  gradientFrom: string;
  gradientTo: string;
  githubUrl?: string;
  demoUrl?: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  screenshots?: {
    url: string;
    caption: string;
  }[];
}

interface LightboxProps {
  screenshots: {
    url: string;
    caption: string;
  }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// Composant Lightbox pour les captures d'écran en plein écran
const Lightbox: React.FC<LightboxProps> = ({ screenshots, currentIndex, onClose, onNext, onPrev }) => {
  const screenshot = screenshots[currentIndex];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        {/* Image courante */}
        <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
          <Image 
            src={screenshot.url} 
            alt={screenshot.caption} 
            width={800}
            height={500}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
          <p className="text-white text-center mt-4 text-lg">{screenshot.caption}</p>
        </div>
        
        {/* Bouton fermer */}
        <button 
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-[70]"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        {/* Navigation */}
        {screenshots.length > 1 && (
          <>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              <ChevronLeft size={28} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight size={28} />
            </button>
            
            {/* Indicateur de position */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {screenshots.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);
  
  // État pour la lightbox
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<number>(0);
  
  // Données des projets
  const projects: Project[] = [
    {
      id: 1,
      title: "Site Internet Tiki Au bord de l'eau",
      description: "Un site internet pour un restaurant de cuisine traditionnelle française.",
      tags: ["React", "Nest.js", "PostgreSQL"],
      gradientFrom: "from-blue-500",
      gradientTo: "to-purple-600",
      githubUrl: "",
      imageUrl: "/ProjetTiki.png",
      longDescription: "Un site internet pour un restaurant de cuisine traditionnelle française, avec une interface de connexion, une gestion de réservation en ligne, et une interface d&apos;administration.",
      features: [
        "Authentification des utilisateurs avec JWT",
        "Gestion de réservation en ligne",
        "Interface de connexion",
        "Interface d'administration complète"
      ],
      technologies: [
        "Frontend: Next.js, Tailwind CSS",
        "Backend: Nest.js, Express",
        "Base de données: PostgreSQL",
        "Authentification: JWT, bcrypt",
      ],
      screenshots: [
        {
          url: "/ProjetTiki.png",
          caption: "Page d'accueil"
        },
        {
            url: "/ProjetTiki1.png",
          caption: "Réservation en ligne"
        },
        {
            url: "/ProjetTiki2.png",
          caption: "Interface de connexion"
        }
      ]
    },
    {
      id: 2,
      title: "Area",
      description: "Site internet permettant l'automatisation de tâches un peu à la n8n",
      tags: ["Nuxt.js", "Nest.js", "PostgreSQL"],
      gradientFrom: "from-green-500",
      gradientTo: "to-blue-600",
      imageUrl: "/projetArea.png",
      longDescription: "Site internet permettant l'automatisation de tâches un peu à la n8n",
      features: [
        "Graphiques interactifs et personnalisables",
        "Interface de connexion",
        "Gestion des workflows",
        "Alertes et notifications"
      ],
      technologies: [
        "Frontend: Vue.js, Nuxt.js",
        "Visualisation: Chart.js",
        "Backend: Nest.js, Go, Architecture microservices",
        "Authentification: JWT",
        "Base de données: PostgreSQL"
      ],
      screenshots: [
        {
          url: "/projetArea.png",
          caption: "Dashboard principal"
        },
        {
          url: "/projetArea1.png",
          caption: "Interface de connexion"
        },
        {
          url: "/projetArea2.png",
          caption: "Gestion des workflows"
        },
        {
            url: "/projetArea3.png",
            caption: "Tableaux de bord personnalisés"
        }
      ]
    },
    {
      id: 3,
      title: "Portfolio Innovant",
      description: "Un portfolio créatif et interactif avec animations 3D, effets de parallaxe et transitions fluides.",
      tags: ["Next.js", "Three.js", "Tailwind CSS"],
      gradientFrom: "from-yellow-500",
      gradientTo: "to-red-600",
      longDescription: "Un portfolio créatif et interactif avec animations 3D, effets de parallaxe et transitions fluides.",
      features: [
        "Suivi du parcours",
        "Suivi des compétences",
        "Suivi des projets",
        "Formulaire de contact",
      ],
      technologies: [
        "Frontend: Next.js, Tailwind CSS",
      ],
    },
  ];
  
  // Ouvrir le modal de détail du projet
  const openProjectDetails = (project: Project) => {
    setAnimating(true);
    setSelectedProject(project);
    setTimeout(() => setAnimating(false), 300);
  };
  
  // Fermer le modal de détail
  const closeProjectDetails = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedProject(null);
      setAnimating(false);
    }, 300);
  }, []);

  // Ouvrir la lightbox pour afficher une capture d'écran en plein écran
  const openLightbox = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentScreenshotIndex(index);
    setLightboxOpen(true);
  }, []);

  // Fermer la lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Navigation dans la lightbox
  const nextScreenshot = useCallback(() => {
    if (selectedProject?.screenshots) {
      setCurrentScreenshotIndex((prevIndex) => 
        (prevIndex + 1) % selectedProject.screenshots!.length
      );
    }
  }, [selectedProject]);

  const prevScreenshot = useCallback(() => {
    if (selectedProject?.screenshots) {
      setCurrentScreenshotIndex((prevIndex) => 
        (prevIndex - 1 + selectedProject.screenshots!.length) % selectedProject.screenshots!.length
      );
    }
  }, [selectedProject]);

  // Support clavier pour la navigation dans la lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          prevScreenshot();
          break;
        case 'ArrowRight':
          nextScreenshot();
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextScreenshot, prevScreenshot, closeLightbox]);

  // Générer les classes pour la carte de projet
  const getProjectCardClasses = () => {
    // Animation décalée pour chaque carte
    return `bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform cursor-pointer opacity-0 animate-fade-in-up`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Mes Projets</h2>
      
      {/* Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div 
            key={project.id} 
            className={getProjectCardClasses()}
            onClick={() => openProjectDetails(project)}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Image ou dégradé du projet */}
            <div className={`h-48 bg-gradient-to-r ${project.gradientFrom} ${project.gradientTo} flex items-center justify-center relative overflow-hidden`}>
              {project.imageUrl ? (
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white relative z-10">{project.title}</span>
              )}
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
            </div>
            
            {/* Contenu du projet */}
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-blue-900/60 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Liens */}
              <div className="flex justify-end space-x-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-400 hover:text-white transition-colors"
                     onClick={(e) => e.stopPropagation()}>
                    <Github size={18} />
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-400 hover:text-white transition-colors"
                     onClick={(e) => e.stopPropagation()}>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal de détail de projet */}
      {selectedProject && (
        <div 
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${
            animating ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeProjectDetails}></div>
          
          <div 
            className={`bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 transform transition-transform duration-300 ${
              animating ? 'scale-95' : 'scale-100'
            }`}
          >
            {/* En-tête avec image */}
            <div className={`h-48 md:h-64 bg-gradient-to-r ${selectedProject.gradientFrom} ${selectedProject.gradientTo} relative overflow-hidden`}>
              {selectedProject.imageUrl && (
                <Image 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Bouton de fermeture */}
              <button 
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              {/* Titre */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-black/30 text-xs px-2 py-1 rounded backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contenu du projet */}
            <div className="p-6 md:p-8">
              {/* Description */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <LayoutDashboard size={18} className="mr-2 text-blue-400" />
                  Description
                </h4>
                <p className="text-gray-300">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>
              
              {/* Fonctionnalités */}
              {selectedProject.features && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Layers size={18} className="mr-2 text-green-400" />
                    Fonctionnalités
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Technologies */}
              {selectedProject.technologies && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <Code size={18} className="mr-2 text-purple-400" />
                    Technologies utilisées
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Captures d'écran */}
              {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Captures d&apos;écran</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProject.screenshots.map((screenshot, i) => (
                      <div 
                        key={i} 
                        className="overflow-hidden rounded-lg cursor-pointer group"
                        onClick={(e) => openLightbox(i, e)}
                      >
                        <div className="relative h-48">
                          <Image 
                            src={screenshot.url} 
                            alt={screenshot.caption} 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full">
                              Agrandir
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 text-center">{screenshot.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Liens */}
              <div className="flex justify-center gap-4 mt-8">
                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github size={18} />
                    <span>Voir le code</span>
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a 
                    href={selectedProject.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Voir la démo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lightbox pour les captures d'écran */}
      {lightboxOpen && selectedProject?.screenshots && (
        <>
          <Lightbox 
            screenshots={selectedProject.screenshots}
            currentIndex={currentScreenshotIndex}
            onClose={closeLightbox}
            onNext={nextScreenshot}
            onPrev={prevScreenshot}
          />
          <BackButton 
            onClick={closeLightbox}
            className="absolute top-2 left-2 z-[70]"
          />
        </>
      )}
      
      {/* Style pour l'animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Projects;