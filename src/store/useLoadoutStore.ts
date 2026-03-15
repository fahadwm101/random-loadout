import { create } from 'zustand';
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
  setClass: (playerClass: PlayerClass) => void;
  generateLoadout: () => void;
  clearHistory: () => void;
  setIsRolling: (rolling: boolean) => void;
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

export const useLoadoutStore = create<LoadoutState>((set, get) => ({
  selectedClass: 'Medium',
  currentLoadout: null,
  history: [],
  isRolling: false,

  setClass: (playerClass) => set({ selectedClass: playerClass }),
  
  setIsRolling: (isRolling) => set({ isRolling }),

  generateLoadout: () => {
    const { history } = get();
    
    // Pick random class (unweighted for now, as requested only for items)
    const classes: PlayerClass[] = ['Light', 'Medium', 'Heavy'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    
    set({ selectedClass: randomClass });
    const classData = GAME_DATA[randomClass];

    const historyIds = getHistoryItemIds(history);

    // Get weighted items
    const randomSpec = getWeightedRandomItem(classData.specializations, historyIds);
    const randomWeapon = getWeightedRandomItem(classData.weapons, historyIds);
    const randomGadgets = getWeightedRandomGadgets(classData.gadgets, historyIds);

    const newLoadout: Loadout = {
      id: Math.random().toString(36).substring(2, 9),
      playerClass: randomClass,
      specialization: randomSpec,
      weapon: randomWeapon,
      gadgets: randomGadgets,
      timestamp: Date.now(),
    };

    set({
      currentLoadout: newLoadout,
      history: [newLoadout, ...history].slice(0, 5), // Keep only last 5
    });
  },

  clearHistory: () => set({ history: [] }),
}));
