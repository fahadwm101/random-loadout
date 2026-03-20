import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Shuffle, Trash2 } from 'lucide-react';

interface TeamSplitterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeamSplitterModal({ isOpen, onClose }: TeamSplitterModalProps) {
  const [namesText, setNamesText] = useState("");
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const splitTeams = () => {
    const names = namesText
      .split("\n")
      .map(n => n.trim())
      .filter(n => n !== "");
    
    if (names.length === 0) return;

    // Shuffle names
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    
    // Create empty teams
    const newTeams: string[][] = Array.from({ length: numTeams }, () => []);
    
    // Distribute names
    shuffled.forEach((name, index) => {
      newTeams[index % numTeams].push(name);
    });
    
    setTeams(newTeams);
  };

  const clearAll = () => {
    setNamesText("");
    setTeams([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-black border border-cyan/30 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{ boxShadow: '0 0 60px 0px rgba(0, 229, 255, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan/20 rounded-lg">
                  <Users className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black uppercase text-cyan tracking-tight">
                    Team Splitter
                  </h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Randomize players into teams
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00e5ff #000' }}>
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-cyan mb-2">
                    Enter Names (one per line)
                  </label>
                  <textarea
                    value={namesText}
                    onChange={(e) => setNamesText(e.target.value)}
                    placeholder="Player 1&#10;Player 2&#10;Player 3..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan/50 transition-all resize-none font-mono text-sm"
                  />
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-cyan mb-2">
                      Number of Teams
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={numTeams}
                      onChange={(e) => setNumTeams(parseInt(e.target.value) || 2)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan/50 transition-all"
                    />
                  </div>
                  <button
                    onClick={splitTeams}
                    disabled={!namesText.trim()}
                    className="flex-1 bg-cyan text-black font-black uppercase tracking-widest px-6 py-2.5 rounded-xl hover:bg-cyan/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    Split Teams
                  </button>
                </div>
              </div>

              {/* Results Section */}
              {teams.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teams.map((team, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-pink font-bold uppercase tracking-tighter mb-3 border-b border-pink/20 pb-1">
                        Team {idx + 1}
                      </h4>
                      <ul className="space-y-1">
                        {team.map((name, nIdx) => (
                          <li key={nIdx} className="text-sm text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan rounded-full" />
                            {name}
                          </li>
                        ))}
                        {team.length === 0 && (
                          <li className="text-xs text-gray-500 italic">No players</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest rounded-lg transition-colors border border-white/10"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
