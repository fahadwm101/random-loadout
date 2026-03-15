import React from 'react';
import { useLoadoutStore } from '@/store/useLoadoutStore';

export function GenerateButton() {
  const isRolling = useLoadoutStore((state) => state.isRolling);
  const setIsRolling = useLoadoutStore((state) => state.setIsRolling);
  const generateLoadout = useLoadoutStore((state) => state.generateLoadout);

  const handleGenerate = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Play sound or other effects here if needed
    
    setTimeout(() => {
      generateLoadout();
      setIsRolling(false);
    }, 2000); // 2 second roulette animation
  };

  return (
    <div className="flex justify-center mt-12 mb-8">
      <button
        onClick={handleGenerate}
        disabled={isRolling}
        className={`cyber-button group relative px-12 py-5 rounded-xl font-black text-2xl uppercase tracking-[0.2em] overflow-hidden transition-all
          ${isRolling 
            ? 'bg-pink/50 text-white/50 cursor-not-allowed transform scale-95' 
            : 'bg-pink text-white hover:scale-105 active:scale-95'
          }`}
      >
        {/* Glow behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
        
        <span className="relative z-10 flex items-center gap-3">
          {isRolling ? (
            <>
              <img src="/face.png" alt="Face" className="w-6 h-6 object-cover rounded-full animate-spin-fast" />
              جاري التشكيل...
            </>
          ) : (
            <>
              <img src="/face.png" alt="Face" className="w-6 h-6 object-cover rounded-full group-hover:animate-pulse" />
               شكلي كوكتيل
            </>
          )}
        </span>
      </button>
    </div>
  );
}
