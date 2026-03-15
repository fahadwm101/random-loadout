import React from 'react';
import { PlayerClass } from '@/lib/data';
import { useLoadoutStore } from '@/store/useLoadoutStore';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function ClassSelector() {
  const selectedClass = useLoadoutStore((state) => state.selectedClass);
  const setClass = useLoadoutStore((state) => state.setClass);
  const isRolling = useLoadoutStore((state) => state.isRolling);

  const classes: { id: PlayerClass; label: string }[] = [
    { id: 'Light', label: 'Light' },
    { id: 'Medium', label: 'Medium' },
    { id: 'Heavy', label: 'Heavy' }
  ];

  return (
    <div 
      className="flex justify-center gap-4 mb-8 p-4 rounded-xl border border-pink/20 bg-black/40"
      style={{ boxShadow: '0 0 100px 0px rgba(255, 0, 85, 0.08)' }}
    >
      {classes.map(({ id, label }) => {
        const isSelected = selectedClass === id;
        return (
          <button
            key={id}
            onClick={() => !isRolling && setClass(id)}
            disabled={isRolling}
            className={clsx(
              "relative px-8 py-3 rounded-lg font-bold tracking-wider uppercase transition-all overflow-hidden",
              isRolling ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
              isSelected ? "text-white" : "text-gray-400 hover:text-white glass"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="activeClass"
                className="absolute inset-0 bg-pink/20 border border-pink"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ borderRadius: 8 }}
              />
            )}
            <span className="relative z-10 text-lg md:text-xl font-black">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
