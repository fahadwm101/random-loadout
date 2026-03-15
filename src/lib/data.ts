export type ItemType = 'weapon' | 'specialization' | 'gadget';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  icon?: string;
}

export interface ClassData {
  specializations: Item[];
  weapons: Item[];
  gadgets: Item[];
}

export interface GameDatabase {
  Light: ClassData;
  Medium: ClassData;
  Heavy: ClassData;
}

export type PlayerClass = 'Light' | 'Medium' | 'Heavy';

export const GAME_DATA: GameDatabase = {
  Light: {
    specializations: [
      { id: 'l_s_1', name: 'اختفاء', type: 'specialization' },
      { id: 'l_s_2', name: 'مراوغة', type: 'specialization' },
      { id: 'l_s_3', name: 'خطاف', type: 'specialization' },
    ],
    weapons: [
      { id: 'l_w_1', name: 'مسدس', type: 'weapon' },
      { id: 'l_w_2', name: 'قناص', type: 'weapon' },
      { id: 'l_w_3', name: 'XP-54', type: 'weapon' },
      { id: 'l_w_4', name: 'اوزي', type: 'weapon' },
      { id: 'l_w_5', name: 'LH1', type: 'weapon' },
      { id: 'l_w_6', name: 'سيف', type: 'weapon' },
      { id: 'l_w_7', name: 'خنجر', type: 'weapon' },
      { id: 'l_w_8', name: '93R', type: 'weapon' },
      { id: 'l_w_9', name: 'ARN-220', type: 'weapon' },
      { id: 'l_w_10', name: 'M26 Matter', type: 'weapon' },
      { id: 'l_w_11', name: 'قوس', type: 'weapon' },
      { id: 'l_w_12', name: 'SH1900', type: 'weapon' },
      { id: 'l_w_13', name: 'سجاجين', type: 'weapon' },

    ],
    gadgets: [
      { id: 'l_g_1', name: 'قنبلة لزك', type: 'gadget' },
      { id: 'l_g_2', name: 'فلاش', type: 'gadget' },
      { id: 'l_g_3', name: 'قنبلة', type: 'gadget' },
      { id: 'l_g_4', name: 'غاز', type: 'gadget' },
      { id: 'l_g_5', name: 'Glitch Grenade', type: 'gadget' },
      { id: 'l_g_6', name: 'Goo Grenade', type: 'gadget' },
      { id: 'l_g_7', name: 'نار', type: 'gadget' },
      { id: 'l_g_8', name: 'سونار', type: 'gadget' },
      { id: 'l_g_9', name: 'دخان', type: 'gadget' },
      { id: 'l_g_10', name: 'مسدس يخفي', type: 'gadget' },
      { id: 'l_g_11', name: 'Thermal Vision', type: 'gadget' },
      { id: 'l_g_12', name: 'Gateway', type: 'gadget' },
      { id: 'l_g_13', name: 'قنبلة الاختفاء', type: 'gadget' },
      { id: 'l_g_14', name: 'Gravity Vortex', type: 'gadget' },
      { id: 'l_g_15', name: 'Thermal Bore', type: 'gadget' },
      { id: 'l_g_16', name: 'Tracking Dart', type: 'gadget' },
    ]
  },
  Medium: {
    specializations: [
      { id: 'm_s_1', name: 'هيلر', type: 'specialization' },
      { id: 'm_s_3', name: 'تورت الغالي', type: 'specialization' },
      { id: 'm_s_4', name: 'تعبر الحايط', type: 'specialization' },
    ],
    weapons: [
      { id: 'm_w_1', name: 'AKM', type: 'weapon' },
      { id: 'm_w_2', name: 'CB-01 Repeater', type: 'weapon' },
      { id: 'm_w_3', name: 'شوتكن ناري', type: 'weapon' },
      { id: 'm_w_4', name: 'CL-40', type: 'weapon' },
      { id: 'm_w_5', name: 'سيوف', type: 'weapon' },
      { id: 'm_w_6', name: 'FAMAS', type: 'weapon' },
      { id: 'm_w_7', name: 'FCAR', type: 'weapon' },
      { id: 'm_w_8', name: 'Model 1887', type: 'weapon' },
      { id: 'm_w_9', name: 'P90', type: 'weapon' },
      { id: 'm_w_10', name: 'Pike-556', type: 'weapon' },
      { id: 'm_w_11', name: 'R.357', type: 'weapon' },
      { id: 'm_w_12', name: 'درع', type: 'weapon' },
    ],
    gadgets: [
      { id: 'm_g_1', name: 'APS Turret', type: 'gadget' },
      { id: 'm_g_2', name: 'Breach Drill', type: 'gadget' },
      { id: 'm_g_3', name: 'Data Reshaper', type: 'gadget' },
      { id: 'm_g_4', name: 'Defibrillator', type: 'gadget' },
      { id: 'm_g_5', name: 'Explosive Mine', type: 'gadget' },
      { id: 'm_g_6', name: 'Flashbang', type: 'gadget' },
      { id: 'm_g_7', name: 'Frag Grenade', type: 'gadget' },
      { id: 'm_g_8', name: 'Gas Grenade', type: 'gadget' },
      { id: 'm_g_9', name: 'Gas Mine', type: 'gadget' },
      { id: 'm_g_10', name: 'Glitch Trap', type: 'gadget' },
      { id: 'm_g_11', name: 'Goo Grenade', type: 'gadget' },
      { id: 'm_g_12', name: 'Jump Pad', type: 'gadget' },
      { id: 'm_g_13', name: 'Proximity Sensor', type: 'gadget' },
      { id: 'm_g_14', name: 'Pyro Grenade', type: 'gadget' },
      { id: 'm_g_15', name: 'Zipline', type: 'gadget' },
      { id: 'm_g_16', name: 'Smoke Grenade', type: 'gadget' },
    ]
  },
  Heavy: {
    specializations: [
      { id: 'h_s_1', name: 'Charge and Slam', type: 'specialization' },
      { id: 'h_s_2', name: 'Goo Gun', type: 'specialization' },
      { id: 'h_s_3', name: 'درع', type: 'specialization' },
      { id: 'h_s_4', name: 'سلسلة', type: 'specialization' },
    ],
    weapons: [
      { id: 'h_w_1', name: '.50 Akimbo', type: 'weapon' },
      { id: 'h_w_2', name: 'BFR Titan', type: 'weapon' },
      { id: 'h_w_3', name: 'نار', type: 'weapon' },
      { id: 'h_w_4', name: 'KS-23', type: 'weapon' },
      { id: 'h_w_5', name: 'Lewis Gun', type: 'weapon' },
      { id: 'h_w_6', name: 'مشين', type: 'weapon' },
      { id: 'h_w_7', name: 'M60', type: 'weapon' },
      { id: 'h_w_8', name: 'MGL32', type: 'weapon' },
      { id: 'h_w_9', name: 'SA1216', type: 'weapon' },
      { id: 'h_w_10', name: 'SHAK-50', type: 'weapon' },
      { id: 'h_w_11', name: 'جاكوج', type: 'weapon' },
      { id: 'h_w_12', name: 'رمح', type: 'weapon' },
    ],
    gadgets: [
      { id: 'h_g_1', name: 'Anti-Gravity Cube', type: 'gadget' },
      { id: 'h_g_2', name: 'Barricade', type: 'gadget' },
      { id: 'h_g_3', name: 'C4', type: 'gadget' },
      { id: 'h_g_4', name: 'Dome Shield', type: 'gadget' },
      { id: 'h_g_5', name: 'Explosive Mine', type: 'gadget' },
      { id: 'h_g_6', name: 'فلاش', type: 'gadget' },
      { id: 'h_g_7', name: 'قنبلة', type: 'gadget' },
      { id: 'h_g_8', name: 'غاز', type: 'gadget' },
      { id: 'h_g_9', name: 'Goo Grenade', type: 'gadget' },
      { id: 'h_g_10', name: 'طوبة هيل', type: 'gadget' },
      { id: 'h_g_11', name: 'Proximity Sensor', type: 'gadget' },
      { id: 'h_g_12', name: 'قنبلة نار', type: 'gadget' },
      { id: 'h_g_13', name: 'Pyro Mine', type: 'gadget' },
      { id: 'h_g_14', name: 'صاروخ', type: 'gadget' },
      { id: 'h_g_15', name: 'دخان', type: 'gadget' },
      { id: 'h_g_16', name: 'Lockbolt', type: 'gadget' },
    ]
  }
};
