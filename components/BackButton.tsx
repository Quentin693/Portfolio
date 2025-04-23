"use client";

import React from 'react';
import { X } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-full bg-red-800/80 hover:bg-red-700 transition-colors ${className}`}
      aria-label="Retour"
    >
      <X size={20} className="text-white" />
    </button>
  );
};

export default BackButton;