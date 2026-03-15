import React from 'react';
import { useLoadoutStore } from '@/store/useLoadoutStore';
import { motion, AnimatePresence } from 'framer-motion';

export function RecentLoadouts() {
  const history = useLoadoutStore((state) => state.history);

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mt-12 mb-8">
      <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-white/50 mb-4 px-2">
        Recent Loadouts
      </h3>
      
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {history.map((loadout, index) => (
            <motion.div
              key={loadout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative bg-black/40 border border-white/5 rounded-lg p-3 md:p-4 hover:border-white/20 transition-all overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4"
            >
              {/* Class Background indicator */}
              <div 
                className={`absolute inset-y-0 left-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity ${
                  loadout.playerClass === 'Light' ? 'bg-cyan' :
                  loadout.playerClass === 'Medium' ? 'bg-pink' :
                  'bg-yellow-400'
                }`}
              />

              {/* Class & Main Items */}
              <div className="flex items-center gap-4 pl-3">
                <span className={`text-xs font-black uppercase tracking-wider ${
                  loadout.playerClass === 'Light' ? 'text-cyan' :
                  loadout.playerClass === 'Medium' ? 'text-pink' :
                  'text-yellow-400'
                }`}>
                  {loadout.playerClass.charAt(0)}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-xs md:text-sm font-bold min-w-[100px]">
                    {loadout.specialization.name}
                  </span>
                  <span className="text-white/30 text-xs">|</span>
                  <span className="text-white text-xs md:text-sm font-bold min-w-[120px]">
                    {loadout.weapon.name}
                  </span>
                </div>
              </div>

              {/* Gadgets */}
              <div className="flex items-center gap-2 pl-3 md:pl-0 w-full md:w-auto">
                {loadout.gadgets.map((gadget, i) => (
                  <div key={`${loadout.id}-g-${i}`} className="flex items-center gap-2 flex-1 md:flex-initial bg-white/5 rounded px-2 md:px-3 py-1 md:py-1.5 border border-white/5">
                    <span className="text-white/60 text-[10px] md:text-xs font-medium truncate max-w-[80px] md:max-w-none">
                      {gadget.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

