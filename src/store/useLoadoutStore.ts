import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GAME_DATA, Item, PlayerClass } from '@/lib/data';

export interface Loadout {
  id: string;
  playerClass: PlayerClass;
  specialization: Item;
  weapon: Item;
  gadgets: [Item, Item, Item];
  timestamp: number;
}

interface LoadoutState {
  selectedClass: PlayerClass;
  currentLoadout: Loadout | null;
  history: Loadout[];
  isRolling: boolean;
  totalGenerations: number;
  setClass: (playerClass: PlayerClass) => void;
  generateLoadout: () => void;
  clearHistory: () => void;
  setIsRolling: (rolling: boolean) => void;
  excludedItemIds: string[];
  toggleExcludeItem: (itemId: string) => void;
}

export function getValidClasses(excludedItemIds: string[]): PlayerClass[] {
  const classes: PlayerClass[] = ['Light', 'Medium', 'Heavy'];
  return classes.filter(cls => {
    const data = GAME_DATA[cls];
    const validWeapons = data.weapons.filter(w => !excludedItemIds.includes(w.id));
    const validSpecs = data.specializations.filter(s => !excludedItemIds.includes(s.id));
    const validGadgets = data.gadgets.filter(g => !excludedItemIds.includes(g.id));
    return validWeapons.length >= 1 && validSpecs.length >= 1 && validGadgets.length >= 3;
  });
}



// 1. Get all item IDs currently in history
function getHistoryItemIds(history: Loadout[]): Set<string> {
  const ids = new Set<string>();
  history.forEach(loadout => {
    ids.add(loadout.weapon.id);
    ids.add(loadout.specialization.id);
    loadout.gadgets.forEach(g => ids.add(g.id));
  });
  return ids;
}

// 2. Weighted random selection for a single item (Weapon / Spec)
function getWeightedRandomItem(items: Item[], historyIds: Set<string>): Item {
  let totalWeight = 0;
  const itemWeights = items.map(item => {
    // 80% penalty if in history
    const weight = historyIds.has(item.id) ? 0.2 : 1.0;
    totalWeight += weight;
    return { item, weight };
  });

  let randomVal = Math.random() * totalWeight;
  for (const { item, weight } of itemWeights) {
    randomVal -= weight;
    if (randomVal <= 0) {
      return item;
    }
  }
  // Fallback
  return items[items.length - 1];
}

// 3. Weighted random selection for 3 unique gadgets
function getWeightedRandomGadgets(items: Item[], historyIds: Set<string>): [Item, Item, Item] {
  const selectedGadgets: Item[] = [];
  let availableItems = [...items];

  for (let i = 0; i < 3; i++) {
    const selected = getWeightedRandomItem(availableItems, historyIds);
    selectedGadgets.push(selected);
    // Remove selected item from available pool so we don't pick it again
    availableItems = availableItems.filter(item => item.id !== selected.id);
  }

  return selectedGadgets as [Item, Item, Item];
}

export const useLoadoutStore = create<LoadoutState>()(
  persist(
    (set, get) => ({
      selectedClass: 'Medium',
      currentLoadout: null,
      history: [],
      isRolling: false,
      excludedItemIds: [],
      totalGenerations: 0,

  setClass: (playerClass) => set({ selectedClass: playerClass }),
  
  setIsRolling: (isRolling) => set({ isRolling }),

  toggleExcludeItem: (itemId) => set((state) => ({
    excludedItemIds: state.excludedItemIds.includes(itemId)
      ? state.excludedItemIds.filter(id => id !== itemId)
      : [...state.excludedItemIds, itemId]
  })),

  generateLoadout: () => {
    const { history, excludedItemIds } = get();
    
    const validClasses = getValidClasses(excludedItemIds);
    if (validClasses.length === 0) {
      return; // Safe guard
    }
    
    // Pick random class (unweighted for now, as requested only for items)
    const randomClass = validClasses[Math.floor(Math.random() * validClasses.length)];
    
    set({ selectedClass: randomClass });
    const classData = GAME_DATA[randomClass];

    const validSpecs = classData.specializations.filter(s => !excludedItemIds.includes(s.id));
    const validWeapons = classData.weapons.filter(w => !excludedItemIds.includes(w.id));
    const validGadgets = classData.gadgets.filter(g => !excludedItemIds.includes(g.id));

    const historyIds = getHistoryItemIds(history);

    // Get weighted items
    const randomSpec = getWeightedRandomItem(validSpecs, historyIds);
    const randomWeapon = getWeightedRandomItem(validWeapons, historyIds);
    const randomGadgets = getWeightedRandomGadgets(validGadgets, historyIds);

    const newLoadout: Loadout = {
      id: Math.random().toString(36).substring(2, 9),
      playerClass: randomClass,
      specialization: randomSpec,
      weapon: randomWeapon,
      gadgets: randomGadgets,
      timestamp: Date.now(),
    };

    set((state) => ({
      currentLoadout: newLoadout,
      history: [newLoadout, ...state.history].slice(0, 5), // Keep only last 5
      totalGenerations: state.totalGenerations + 1,
    }));
  },

  clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'loadout-storage',
      partialize: (state) => ({ totalGenerations: state.totalGenerations }), // Only persist totalGenerations
    }
  )
);
