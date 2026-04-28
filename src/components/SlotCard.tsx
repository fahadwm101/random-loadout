import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Item, GAME_DATA, PlayerClass } from '@/lib/data';
import { useLoadoutStore } from '@/store/useLoadoutStore';
import { Shield, Crosshair, Wrench } from 'lucide-react';

interface SlotCardProps {
  label: string;
  item: Item | null;
}

export function SlotCard({ label, item }: SlotCardProps) {
  const isRolling = useLoadoutStore((state) => state.isRolling);
  const selectedClass = useLoadoutStore((state) => state.selectedClass);

  const getIcon = (type?: string) => {
    switch (type) {
      case 'weapon':
        return <Crosshair className="w-6 h-6 md:w-8 md:h-8 text-cyan" />;
      case 'specialization':
        return <Shield className="w-6 h-6 md:w-8 md:h-8 text-pink" />;
      case 'gadget':
        return <Wrench className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />;
      default:
        return <Crosshair className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-1 md:gap-2 w-full h-full">
      <div className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider text-center truncate px-1">
        {label}
      </div>
      <motion.div 
        className="glass rounded-xl p-4 md:py-6 md:px-4 flex flex-col items-center justify-between min-h-[8rem] md:min-h-[12rem] relative overflow-hidden group w-full border border-white/10 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="popLayout">
          {isRolling ? (
            <motion.div
              key="rolling"
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 md:gap-4 w-full h-full justify-center"
            >
               {/* Extract a small inner spinning component to hold the rapid state changes during roll */}
               <SpinningContent selectedClass={selectedClass} label={label} getIcon={getIcon} />
            </motion.div>
          ) : item ? (
            <motion.div
              key={item.id}
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="flex flex-col items-center gap-2 md:gap-4 w-full h-full justify-center"
            >
              <div className="p-2 md:p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-pink/50 transition-colors shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="text-center w-full px-1 overflow-hidden flex flex-col items-center justify-end mt-auto h-auto">
                <h3 
                  className="font-bold text-sm md:text-lg text-white truncate w-full block leading-tight" 
                  title={item.name}
                >
                  {item.name}
                </h3>
                <p className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider mt-1 md:mt-2 truncate w-full block leading-none">
                  {item.type}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-gray-600 h-full w-full"
            >
              <div className="text-2xl md:text-4xl mb-1 md:mb-2">?</div>
              <div className="text-[9px] md:text-xs uppercase tracking-widest text-center mt-auto">Awaiting Roll</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cyberpunk accent lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
}

// Sub-component specifically to handle the fast interval state changes strictly within itself
// This fixes cascading render errors since it's mounted/unmounted purely by the parent's `isRolling` state
function SpinningContent({ selectedClass, label, getIcon }: { selectedClass: PlayerClass, label: string, getIcon: (type?: string) => React.ReactNode }) {
  const excludedItemIds = useLoadoutStore((state) => state.excludedItemIds);

  const getValidItems = React.useCallback(() => {
    let items: Item[] = [];
    if (label.includes('Weapon')) {
      items = GAME_DATA[selectedClass].weapons;
    } else if (label.includes('Specialization')) {
      items = GAME_DATA[selectedClass].specializations;
    } else {
      items = GAME_DATA[selectedClass].gadgets;
    }
    const filtered = items.filter(item => !excludedItemIds.includes(item.id));
    return filtered.length > 0 ? filtered : items; // Fallback if all excluded
  }, [label, selectedClass, excludedItemIds]);

  const [spinItem, setSpinItem] = useState<Item>(() => {
    const validItems = getValidItems();
    return validItems[Math.floor(Math.random() * validItems.length)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const validItems = getValidItems();
      setSpinItem(validItems[Math.floor(Math.random() * validItems.length)]);
    }, 70);

    return () => clearInterval(interval);
  }, [getValidItems]);

  return (
    <>
      <div className="p-2 md:p-3 rounded-full bg-white/5 border border-white/10 transition-colors shrink-0 blur-[1px]">
        {getIcon(spinItem.type)}
      </div>
      <div className="text-center w-full px-1 overflow-hidden flex flex-col items-center justify-end mt-auto h-auto blur-[1px]">
        <h3 className="font-bold text-sm md:text-lg text-white/70 truncate w-full block leading-tight">
          {spinItem.name}
        </h3>
        <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-wider mt-1 md:mt-2 truncate w-full block leading-none">
          {spinItem.type}
        </p>
      </div>
    </>
  );
}
