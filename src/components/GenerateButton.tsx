import Image from 'next/image';
import React from 'react';
import { useLoadoutStore, getValidClasses } from '@/store/useLoadoutStore';

export function GenerateButton() {
  const isRolling = useLoadoutStore((state) => state.isRolling);
  const setIsRolling = useLoadoutStore((state) => state.setIsRolling);
  const generateLoadout = useLoadoutStore((state) => state.generateLoadout);
  const excludedItemIds = useLoadoutStore((state) => state.excludedItemIds);

  const validClasses = getValidClasses(excludedItemIds);
  const isInvalid = validClasses.length === 0;

  const handleGenerate = () => {
    if (isRolling || isInvalid) return;
    
    setIsRolling(true);
    
    setTimeout(() => {
      generateLoadout();
      setIsRolling(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center mt-12 mb-8">
      <button
        onClick={handleGenerate}
        disabled={isRolling || isInvalid}
        className={`cyber-button group relative px-12 py-5 rounded-xl font-black text-2xl uppercase tracking-[0.2em] overflow-hidden transition-all
          ${isInvalid 
            ? 'bg-red-500/20 text-red-500/50 cursor-not-allowed border border-red-500/20 transform scale-95'
            : isRolling 
              ? 'bg-pink/50 text-white/50 cursor-not-allowed transform scale-95' 
              : 'bg-pink text-white hover:scale-105 active:scale-95'
          }`}
      >
        {!isInvalid && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
        )}
        
        <span className="relative z-10 flex items-center gap-4">
          {isInvalid ? (
            <>
              <span className="text-xl">⚠️</span>
              Too Many Exclusions
            </>
          ) : isRolling ? (
            <>
              <div className="relative w-8 h-8 animate-spin-slow">
                <Image src="/web.p.png" alt="Logo" fill className="object-contain" />
              </div>
              Generating...
            </>
          ) : (
            <>
              <div className="relative w-8 h-8 group-hover:scale-110 transition-transform">
                <Image src="/web.p.png" alt="Logo" fill className="object-contain" />
              </div>
              RANDOM
            </>
          )}
        </span>
      </button>
    </div>
  );
}
