import React from 'react';
import { useLoadoutStore } from '@/store/useLoadoutStore';
import { Clock, Trash2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HistoryPanel() {
  const { history, clearHistory } = useLoadoutStore();

  if (history.length === 0) return null;

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto glass rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan" />
          Loadout History
        </h2>
        <button
          onClick={clearHistory}
          className="text-gray-400 hover:text-pink transition-colors flex items-center gap-2 text-sm uppercase font-bold"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((loadout, i) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={loadout.id}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan/30 transition-colors"
          >
            <div className="font-bold text-pink w-16">{loadout.playerClass}</div>
            <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
            
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-2 text-sm flex-wrap items-center">
                <span className="text-white truncate" title={loadout.specialization.name}>
                  {loadout.specialization.name}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-white truncate" title={loadout.weapon.name}>
                  {loadout.weapon.name}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-300 truncate text-xs" title={loadout.gadgets.map(g => g.name).join(', ')}>
                  {loadout.gadgets.map(g => g.name).join(', ')}
                </span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 shrink-0">
              {new Date(loadout.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
