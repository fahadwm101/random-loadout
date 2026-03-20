"use client";

import React, { useState } from "react";
import { ClassSelector } from "@/components/ClassSelector";
import { FilterModal } from "@/components/FilterModal";
import { SlotCard } from "@/components/SlotCard";
import { GenerateButton } from "@/components/GenerateButton";
import { RecentLoadouts } from "@/components/RecentLoadouts";
import { TeamSplitterModal } from "@/components/TeamSplitterModal";
import { useLoadoutStore } from "@/store/useLoadoutStore";
import { Copy, Check, Settings2, Dices } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const currentLoadout = useLoadoutStore((state) => state.currentLoadout);
  const isRolling = useLoadoutStore((state) => state.isRolling);
  const [copied, setCopied] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isTeamSplitterOpen, setIsTeamSplitterOpen] = useState(false);

  const handleCopy = () => {
    if (!currentLoadout) return;

    const text = `[THE FINALS LOADOUT]
Class: ${currentLoadout.playerClass}
Specialization: ${currentLoadout.specialization.name}
Weapon: ${currentLoadout.weapon.name}
Gadgets:
1. ${currentLoadout.gadgets[0].name}
2. ${currentLoadout.gadgets[1].name}
3. ${currentLoadout.gadgets[2].name}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-16 relative flex flex-col items-center overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Image 
                src="/web.p.png" 
                alt="Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
              The Finals Random <span className="text-pink drop-shadow-[0_0_15px_rgba(255,0,85,0.5)]">Loadout</span>
            </h1>
          </div>
          <p className="text-cyan font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm lg:text-base">
            For The Finals
          </p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] font-black tracking-widest uppercase text-[10px] md:text-xs mt-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] animate-shine">
             THE GOAT: محمد احمد 
          </p>
        </div>

        {/* Top: Class Selector */}
        <ClassSelector />

        <div className="flex justify-center w-full mb-8 -mt-4">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-pink hover:text-white transition-all bg-pink/10 px-4 py-2 rounded-lg border border-pink/20 hover:border-pink/50 hover:bg-pink/20"
          >
            <Settings2 className="w-4 h-4" />
            Customize Filters
          </button>
        </div>

        {/* Cards Container with Header */}
        <div 
          className="w-full max-w-5xl mt-4 relative bg-black rounded-2xl p-6 border border-cyan/20"
          style={{ boxShadow: '0 0 120px 0px rgba(0, 229, 255, 0.08)' }}
        >
          
          {/* Header Row: Title and Copy Button aligned properly */}
          <div className="flex justify-between items-end w-full mb-4">
            <h2 className="text-base md:text-lg font-bold uppercase tracking-widest text-white/50">
              Current Loadout
            </h2>
            
            <div className="min-h-[36px] flex items-end">
              <AnimatePresence>
                {currentLoadout && !isRolling && (
                  <motion.button
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-all bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 md:w-4 md:h-4 text-green-400" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
                    {copied ? "Copied!" : "Copy Loadout"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Middle: Loadout Slots Layout */}
          {/* Mobile: 2 cols (last spans 2) | Tablet: 3 cols (last 2 span differently) | Desktop: 5 cols */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="col-span-1">
              <SlotCard label="Specialization" item={currentLoadout?.specialization || null} />
            </div>
            <div className="col-span-1">
              <SlotCard label="Weapon" item={currentLoadout?.weapon || null} />
            </div>
            <div className="col-span-1 md:col-start-1 lg:col-start-3">
              <SlotCard label="Gadget 1" item={currentLoadout ? currentLoadout.gadgets[0] : null} />
            </div>
            <div className="col-span-1 md:col-start-2 lg:col-start-4">
              <SlotCard label="Gadget 2" item={currentLoadout ? currentLoadout.gadgets[1] : null} />
            </div>
            {/* On mobile, this spans both columns to center nicely */}
            <div className="col-span-2 md:col-span-1 md:col-start-3 lg:col-span-1 lg:col-start-5">
              <SlotCard label="Gadget 3" item={currentLoadout ? currentLoadout.gadgets[2] : null} />
            </div>
          </div>
        </div>

        {/* Bottom: Generate Button */}
        <GenerateButton />

        {/* Recent Loadouts (History) */}
        <RecentLoadouts />

      </div>
      
      {/* Top Left Team Splitter Button */}
      <button 
        onClick={() => setIsTeamSplitterOpen(true)}
        className="absolute top-4 left-4 md:top-8 md:left-8 z-50 text-gray-500 hover:text-cyan transition-colors text-xs md:text-sm tracking-wide font-medium bg-black/40 px-3 py-1.5 rounded-full border border-white/5 hover:border-cyan/20 backdrop-blur-sm group flex items-center gap-2"
      >
        <Dices className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        <span className="hidden sm:inline">Team Splitter</span>
      </button>

      {/* Top Right Corner Link */}
      <a 
        href="https://fahadwm101.github.io/FAHAD.GITHUP/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-gray-500 hover:text-white transition-colors text-xs md:text-sm tracking-wide font-medium bg-black/40 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/20 backdrop-blur-sm group flex items-center gap-2"
      >
        <span>تاج الراس</span>
        <span className="opacity-50 group-hover:opacity-100 transition-opacity">👑</span>
      </a>

      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
      <TeamSplitterModal isOpen={isTeamSplitterOpen} onClose={() => setIsTeamSplitterOpen(false)} />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h2>Best Random Loadout Builder for The Finals Season 4</h2>
        <p>
          Use our free The Finals loadout generator to randomize your weapons, gadgets, and specializations. 
          Whether you play Light, Medium, or Heavy class, this tool helps you discover new and fun builds 
          for tournaments and quick cash modes. Built for The Finals community.
        </p>
      </div>
    </main>
  );
}
