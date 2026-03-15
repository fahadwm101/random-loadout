import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadoutStore } from '@/store/useLoadoutStore';
import { GAME_DATA, Item } from '@/lib/data';
import { X, Ban } from 'lucide-react';
import { clsx } from 'clsx';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const selectedClass = useLoadoutStore((state) => state.selectedClass);
  const excludedItemIds = useLoadoutStore((state) => state.excludedItemIds);
  const toggleExcludeItem = useLoadoutStore((state) => state.toggleExcludeItem);

  const classData = GAME_DATA[selectedClass];

  const renderItemGrid = (title: string, items: Item[]) => (
    <div className="mb-6">
      <h3 className="text-cyan font-bold tracking-widest uppercase text-sm mb-3 border-b border-cyan/20 pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {items.map((item) => {
          const isExcluded = excludedItemIds.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleExcludeItem(item.id)}
              className={clsx(
                "relative p-2 text-xs md:text-sm rounded-lg border transition-all flex items-center justify-between text-left",
                isExcluded 
                  ? "border-red-500/50 bg-red-500/10 text-gray-400 opacity-60" 
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white"
              )}
            >
              <span className="truncate pr-2">{item.name}</span>
              {isExcluded && <Ban className="w-4 h-4 text-red-500 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-black border border-pink/30 rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 0 60px 0px rgba(255, 0, 85, 0.15)' }}
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase text-pink tracking-tight">
                  Customize Filters
                </h2>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  Exclude items for {selectedClass} class
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ff0055 #000' }}>
              {renderItemGrid('Weapons', classData.weapons)}
              {renderItemGrid('Specializations', classData.specializations)}
              {renderItemGrid('Gadgets', classData.gadgets)}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
               <button
                onClick={onClose}
                className="px-6 py-2 bg-pink text-white font-bold uppercase tracking-wider rounded-lg hover:bg-pink/80 transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
