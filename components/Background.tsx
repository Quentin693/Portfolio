"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  connections: number;
}

interface CanvasSize {
  width: number;
  height: number;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isMobile, setIsMobile] = useState(false);
  
  // Configuration des particules
  const particleConfig = useCallback(() => {
    // Réduire le nombre de particules et les paramètres sur mobile pour de meilleures performances
    return {
      particleCount: isMobile ? 40 : 80,
      particleBaseSize: isMobile ? 1 : 1.5,
      particleAddedSize: isMobile ? 1 : 1.5,
      particleBaseSpeed: 0.1,
      particleAddedSpeed: 0.1,
      particleVariance: 0.5,
      connectionDistance: isMobile ? 100 : 150, // Distance réduite sur mobile
      maxConnections: isMobile ? 2 : 3, // Moins de connexions sur mobile
      baseColor: "#1E40AF",
      addedColor: "#8B5CF6"
    };
  }, [isMobile]);
  
  // Détection du mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Vérifier à l'initialisation
    checkIfMobile();
    
    // Ajouter un écouteur pour vérifier lors du redimensionnement
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Fonction pour initialiser les particules
  const initialiseParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const config = particleConfig();
    const newParticles: Particle[] = [];
    const { width, height } = canvasSize;
    
    for (let i = 0; i < config.particleCount; i++) {
      // Position aléatoire dans le canvas
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      // Vitesse aléatoire (légère)
      const vx = (Math.random() - 0.5) * (config.particleBaseSpeed + Math.random() * config.particleAddedSpeed);
      const vy = (Math.random() - 0.5) * (config.particleBaseSpeed + Math.random() * config.particleAddedSpeed);
      
      // Taille aléatoire
      const size = config.particleBaseSize + Math.random() * config.particleAddedSize;
      
      // Couleur avec variation légère
      const colorVariation = Math.random() * config.particleVariance;
      const color = i % 2 === 0 
        ? `rgba(30, 64, 175, ${0.2 + colorVariation})` // Basé sur baseColor
        : `rgba(139, 92, 246, ${0.2 + colorVariation})`; // Basé sur addedColor
      
      newParticles.push({
        x,
        y,
        vx,
        vy,
        size,
        color,
        connections: 0
      });
    }
    
    setParticles(newParticles);
  }, [canvasSize, particleConfig]);
  
  // Fonction pour connecter les particules entre elles
  const connectParticles = useCallback((particle: Particle, ctx: CanvasRenderingContext2D) => {
    particle.connections = 0;
    const config = particleConfig();
    
    for (let i = 0; i < particles.length; i++) {
      const otherParticle = particles[i];
      
      // Ne pas connecter à soi-même
      if (particle === otherParticle) continue;
      
      // Limiter le nombre de connexions par particule
      if (particle.connections >= config.maxConnections) break;
      
      // Calculer la distance entre les particules
      const dx = particle.x - otherParticle.x;
      const dy = particle.y - otherParticle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Si la distance est inférieure à la limite, connecter les particules
      if (distance < config.connectionDistance) {
        // Opacité basée sur la distance
        const opacity = 1 - (distance / config.connectionDistance);
        
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(otherParticle.x, otherParticle.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
        ctx.lineWidth = isMobile ? 0.5 : 1; // Lignes plus fines sur mobile
        ctx.stroke();
        
        particle.connections++;
      }
    }
  }, [particles, particleConfig, isMobile]);
  
  // Initialisation et gestion du redimensionnement
  useEffect(() => {
    // Fonction pour redimensionner le canvas
    const handleResize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    // Appeler handleResize immédiatement
    handleResize();
    
    // Ajouter un écouteur d'événement de redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Nettoyer l'écouteur d'événement lors du démontage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Réinitialiser les particules lors du changement de taille ou de mode (mobile/desktop)
  useEffect(() => {
    initialiseParticles();
  }, [initialiseParticles, isMobile, canvasSize]);

  // Animation des particules
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Fonction d'animation
    let animationFrameId: number;
    
    const render = () => {
      if (!ctx) return;
      
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Mettre à jour et dessiner chaque particule
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Mise à jour de la position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebond sur les bords
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
        }
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connexions avec d'autres particules
        connectParticles(particle, ctx);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, canvasSize, connectParticles, particleConfig]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className="fixed inset-0 w-full h-full z-0 bg-gray-900"
    />
  );
};

export default InteractiveBackground;