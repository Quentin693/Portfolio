import React, { useState } from 'react';
import { Code, Server } from 'lucide-react';
import Image from 'next/image';

// Définir les types pour les compétences
interface Skill {
  name: string;
  logo: string;
  color: string;
  description: string;
}

// Définir le type pour les catégories de compétences
interface SkillCategories {
  [key: string]: Skill[];
}

const SkillsComponent = () => {
  // État pour suivre quel groupe de compétences est sélectionné
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database' | 'other'>('frontend');
  
  // Regrouper les langages par catégorie avec niveau de compétence (1-5)
  const skillCategories: SkillCategories = {
    frontend: [
      { name: 'React', logo: '/logos/react.png', color: 'text-blue-400', description: 'Développement d\'interfaces utilisateur complexes et performantes' },
      { name: 'Vue.js', logo: '/logos/vue.png', color: 'text-green-400', description: 'Création d\'applications web progressives' },
      { name: 'Nuxt.js', logo: '/logos/nuxt.png', color: 'text-green-400', description: 'Framework Vue.js pour applications universelles' },
      { name: 'TypeScript', logo: '/logos/ts.png', color: 'text-blue-600', description: 'Typage statique pour JavaScript' },
      { name: 'Next.js', logo: '/logos/next.png', color: 'text-white', description: 'Framework React pour applications avec rendu côté serveur' },
      { name: 'Tailwind CSS', logo: '/logos/tailwind.png', color: 'text-blue-500', description: 'Framework CSS utilitaire pour designs personnalisés' },
    ],
    backend: [
      { name: 'Node.js', logo: '/logos/nodejs.png', color: 'text-green-500', description: 'Environnement d\'exécution JavaScript côté serveur' },
      { name: 'Nest.js', logo: '/logos/nestjs.png', color: 'text-red-500', description: 'Framework Node.js progressif pour applications côté serveur' },
      { name: 'Python', logo: '/logos/python.png', color: 'text-yellow-500', description: 'Automatisation, traitement de données et scripts' },
    ],
    database: [
      { name: 'PostgreSQL', logo: '/logos/PostgresSQL.png', color: 'text-blue-500', description: 'Système de gestion de base de données relationnelle' },
      { name: 'MongoDB', logo: '/logos/mongoDB.png', color: 'text-green-500', description: 'Base de données NoSQL orientée documents' },
    ],
    other: [
      { name: 'C', logo: '/logos/langageC.png', color: 'text-blue-500', description: 'Programmation système et embarquée' },
      { name: 'C++', logo: '/logos/langageCpp.png', color: 'text-blue-500', description: 'Développement de logiciels performants' },
    ]
  };

  // Outils avec niveau de compétence
  const tools: Skill[] = [
    { name: 'VSCode', logo: '/logos/vscode.png', color: 'text-blue-500', description: 'Éditeur de code principal' },
    { name: 'GitHub', logo: '/logos/github.png', color: 'text-white', description: 'Gestion de versions et collaboration' },
    { name: 'Docker', logo: '/logos/docker.png', color: 'text-blue-500', description: 'Containerisation d\'applications' },
    { name: 'Figma', logo: '/logos/figma.png', color: 'text-purple-500', description: 'Design d\'interfaces et prototypage' },
    { name: 'Notion', logo: '/logos/notion.png', color: 'text-white', description: 'Gestion de projets et documentation' },
    { name: 'CursorAI', logo: '/logos/cursorAi.png', color: 'text-purple-500', description: 'Assistance au développement par IA' },
  ];

  // Fonction pour afficher les skills avec description et niveau
  const renderSkills = (skills: Skill[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill: Skill) => (
          <div 
            key={skill.name}
            className="bg-gray-800 rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 flex items-center justify-center mr-4 relative bg-gray-700/50 rounded-lg overflow-hidden">
                <Image 
                  src={skill.logo} 
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10" 
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232d3748'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='20' text-anchor='middle' fill='white' dominant-baseline='middle'%3E%3F%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <p className="text-sm text-blue-500">{skill.name}</p>
            </div>
            <p className="text-sm text-gray-400">{skill.description}</p>
          </div>
        ))}
      </div>
    );
  };

  // Tabs pour les catégories
  const tabs = [
    { id: 'frontend' as const, label: 'Frontend', icon: <Code size={16} /> },
    { id: 'backend' as const, label: 'Backend', icon: <Server size={16} /> },
    { id: 'database' as const, label: 'Bases de données', icon: <Server size={16} /> },
    { id: 'other' as const, label: 'Autres', icon: <Server size={16} /> }
  ];

  // Fonction de changement d'onglet
  const handleTabChange = (tabId: 'frontend' | 'backend' | 'database' | 'other') => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Mes Compétences</h2>
      <p className="text-gray-400 text-center mb-12">Expertise technique et outils que j&apos;utilise quotidiennement</p>
      
      {/* Section des langages avec tabs */}
      <div className="mb-16 relative">
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <Code className="mr-2 text-blue-400" />
          <span>Langages et Frameworks</span>
        </h3>
        
        <div className="mb-6 relative">
          <div className="flex flex-wrap border-b border-gray-700 mb-6 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  handleTabChange(tab.id);
                }}
                type="button"
                className={`relative z-20 flex items-center px-6 py-3 rounded-t-lg transition-colors mr-2 mb-2 cursor-pointer focus:outline-none ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 text-white font-bold' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="transition-all duration-300 relative z-0">
            {skillCategories[activeTab] && renderSkills(skillCategories[activeTab])}
          </div>
        </div>
      </div>
      
      {/* Section des outils */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <Server className="mr-2 text-green-400" />
          <span>Outils et Environnements</span>
        </h3>
        
        {renderSkills(tools)}
      </div>
    </div>
  );
};

export default SkillsComponent;