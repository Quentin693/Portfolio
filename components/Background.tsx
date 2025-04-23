"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  connections: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Configuration des particules
  const particleConfig = {
    particleCount: 100,
    particleBaseSize: 2,
    particleAddedSize: 1,
    particleBaseSpeed: 0.5,
    particleVariance: 1,
    particleAddedSpeed: 0.5,
    baseColor: [62, 116, 245], // Blue
    addedColor: [149, 76, 233], // Purple
    connectionDistance: 150,
    maxConnections: 5
  };

  // Mise à jour des dimensions lors du chargement et du redimensionnement
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement;
        setDimensions({
          width: clientWidth,
          height: clientHeight
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialisation des particules
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    particlesRef.current = Array(particleConfig.particleCount)
      .fill()
      .map(() => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: 
          particleConfig.particleBaseSize + 
          Math.random() * particleConfig.particleAddedSize,
        speedX: 
          (Math.random() - 0.5) * particleConfig.particleVariance * 
          (particleConfig.particleBaseSpeed + Math.random() * particleConfig.particleAddedSpeed),
        speedY: 
          (Math.random() - 0.5) * particleConfig.particleVariance * 
          (particleConfig.particleBaseSpeed + Math.random() * particleConfig.particleAddedSpeed),
        connections: 0
      }));

  }, [dimensions]);

  // Suivi du mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation du canvas
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Configuration du canvas
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Fonction d'animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Réinitialiser les connexions
      particlesRef.current.forEach(p => {
        p.connections = 0;
      });

      // Dessiner les connexions entre particules
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particleA = particlesRef.current[i];
        
        // Connexion avec la souris
        const distanceToMouse = Math.hypot(
          mousePosition.x - particleA.x,
          mousePosition.y - particleA.y
        );
        
        if (distanceToMouse < particleConfig.connectionDistance * 1.5) {
          const opacity = 1 - distanceToMouse / (particleConfig.connectionDistance * 1.5);
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
          ctx.stroke();
          
          // Attirer légèrement les particules vers la souris
          particleA.x += (mousePosition.x - particleA.x) * 0.01;
          particleA.y += (mousePosition.y - particleA.y) * 0.01;
        }
        
        // Connexions avec d'autres particules
        if (particleA.connections < particleConfig.maxConnections) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const particleB = particlesRef.current[j];
            
            if (particleB.connections < particleConfig.maxConnections) {
              const dx = particleA.x - particleB.x;
              const dy = particleA.y - particleB.y;
              const distance = Math.hypot(dx, dy);
              
              if (distance < particleConfig.connectionDistance) {
                const opacity = 1 - distance / particleConfig.connectionDistance;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                
                // Couleur des lignes en dégradé
                const gradientColor = particleConfig.baseColor.map((c, idx) => {
                  return Math.floor(c + (particleConfig.addedColor[idx] - c) * (distance / particleConfig.connectionDistance));
                });
                
                ctx.strokeStyle = `rgba(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]}, ${opacity * 0.8})`;
                ctx.stroke();
                
                particleA.connections++;
                particleB.connections++;
              }
            }
          }
        }
      }

      // Mettre à jour et dessiner les particules
      particlesRef.current.forEach(particle => {
        // Mettre à jour la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebondir sur les bords
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1;
        }
        
        // Assurer que les particules restent dans les limites
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
        
        // Dessiner la particule
        const distanceToMouse = Math.hypot(
          mousePosition.x - particle.x,
          mousePosition.y - particle.y
        );
        
        const maxDistance = dimensions.width * 0.3;
        const distanceFactor = Math.max(0, 1 - distanceToMouse / maxDistance);
        const size = particle.size * (1 + distanceFactor);
        
        // Couleur des particules
        const particleColor = particleConfig.baseColor.map((c, idx) => {
          return Math.floor(c + (particleConfig.addedColor[idx] - c) * distanceFactor);
        });
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, 0.8)`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)',
        pointerEvents: 'none' 
      }}
    />
  );
};

export default InteractiveBackground;