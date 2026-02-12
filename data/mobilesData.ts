 // data/mobilesData.ts

export interface Mobile {
  id: number;
  image: string;
  name: string;
  price: number;
  brand: string;
}

// Brand color mapping for placeholder images
const brandColors: Record<string, { bg: string; text: string }> = {
  Realme:  { bg: 'FFDD00', text: '000000' },
  Infinix: { bg: '0057A8', text: 'FFFFFF' },
  Tecno:   { bg: '00AAFF', text: 'FFFFFF' },
  Vivo:    { bg: '415FFF', text: 'FFFFFF' },
  Oppo:    { bg: '1D2671', text: 'FFFFFF' },
  Samsung: { bg: '1428A0', text: 'FFFFFF' },
  Xiaomi:  { bg: 'FF6900', text: 'FFFFFF' },
  Nokia:   { bg: '124191', text: 'FFFFFF' },
  Itel:    { bg: '009944', text: 'FFFFFF' },
};

const getPlaceholderImage = (name: string, brand: string): string => {
  const colors = brandColors[brand] ?? { bg: 'CCCCCC', text: '333333' };
  return `https://placehold.co/300x400/${colors.bg}/${colors.text}?text=${encodeURIComponent(name)}`;
};

// ✅ Single Source of Truth — sab mobiles ek jagah
export const allMobiles: Mobile[] = [

  // --- Above 50k ---
  { id: 1,  image: getPlaceholderImage('Realme C85 Pro', 'Realme'),            name: 'Realme C85 Pro',            price: 59999, brand: 'Realme'  },
  { id: 2,  image: getPlaceholderImage('Infinix Hot 60 Pro Plus', 'Infinix'),  name: 'Infinix Hot 60 Pro Plus',   price: 59999, brand: 'Infinix' },
  { id: 7,  image: getPlaceholderImage('Tecno Camon 40 Premier 5G', 'Tecno'), name: 'Tecno Camon 40 Premier 5G', price: 89999, brand: 'Tecno'   },
  { id: 8,  image: getPlaceholderImage('Tecno Camon 40 Pro', 'Tecno'),         name: 'Tecno Camon 40 Pro',        price: 74999, brand: 'Tecno'   },
  { id: 9,  image: getPlaceholderImage('Infinix Note 50 Pro Plus', 'Infinix'), name: 'Infinix Note 50 Pro Plus',  price: 64999, brand: 'Infinix' },
  { id: 10, image: getPlaceholderImage('Infinix Note 50 Pro', 'Infinix'),      name: 'Infinix Note 50 Pro',       price: 54999, brand: 'Infinix' },

  // --- 40k - 50k ---
  { id: 4,  image: getPlaceholderImage('Infinix Hot 60 Pro', 'Infinix'),       name: 'Infinix Hot 60 Pro',        price: 46999, brand: 'Infinix' },
  { id: 11, image: getPlaceholderImage('Realme 12 Plus', 'Realme'),            name: 'Realme 12 Plus',            price: 49999, brand: 'Realme'  },
  { id: 12, image: getPlaceholderImage('Vivo Y300', 'Vivo'),                   name: 'Vivo Y300',                 price: 44999, brand: 'Vivo'    },
  { id: 13, image: getPlaceholderImage('Oppo A3 Pro', 'Oppo'),                 name: 'Oppo A3 Pro',               price: 42999, brand: 'Oppo'    },
  { id: 14, image: getPlaceholderImage('Samsung Galaxy A35', 'Samsung'),       name: 'Samsung Galaxy A35',        price: 48999, brand: 'Samsung' },
  { id: 15, image: getPlaceholderImage('Xiaomi Redmi Note 14', 'Xiaomi'),      name: 'Xiaomi Redmi Note 14',      price: 45999, brand: 'Xiaomi'  },

  // --- 30k - 40k ---
  { id: 3,  image: getPlaceholderImage('Realme Note 70', 'Realme'),            name: 'Realme Note 70',            price: 31999, brand: 'Realme'  },
  { id: 5,  image: getPlaceholderImage('Infinix Hot 60i', 'Infinix'),          name: 'Infinix Hot 60i',           price: 33999, brand: 'Infinix' },
  { id: 6,  image: getPlaceholderImage('Realme C71', 'Realme'),                name: 'Realme C71',                price: 36999, brand: 'Realme'  },
  { id: 16, image: getPlaceholderImage('Samsung Galaxy A16', 'Samsung'),       name: 'Samsung Galaxy A16',        price: 37999, brand: 'Samsung' },
  { id: 17, image: getPlaceholderImage('Tecno Spark 30C', 'Tecno'),            name: 'Tecno Spark 30C',           price: 34999, brand: 'Tecno'   },
  { id: 18, image: getPlaceholderImage('Infinix Hot 50 Pro', 'Infinix'),       name: 'Infinix Hot 50 Pro',        price: 32999, brand: 'Infinix' },

  // --- 20k - 30k ---
  { id: 19, image: getPlaceholderImage('Realme C65', 'Realme'),                name: 'Realme C65',                price: 27999, brand: 'Realme'  },
  { id: 20, image: getPlaceholderImage('Infinix Hot 50i', 'Infinix'),          name: 'Infinix Hot 50i',           price: 24999, brand: 'Infinix' },
  { id: 21, image: getPlaceholderImage('Tecno Spark 20C', 'Tecno'),            name: 'Tecno Spark 20C',           price: 22999, brand: 'Tecno'   },
  { id: 22, image: getPlaceholderImage('Samsung Galaxy A06', 'Samsung'),       name: 'Samsung Galaxy A06',        price: 25999, brand: 'Samsung' },
  { id: 23, image: getPlaceholderImage('Xiaomi Redmi 14C', 'Xiaomi'),          name: 'Xiaomi Redmi 14C',          price: 28999, brand: 'Xiaomi'  },
  { id: 24, image: getPlaceholderImage('Vivo Y19s', 'Vivo'),                   name: 'Vivo Y19s',                 price: 23999, brand: 'Vivo'    },

  // --- 10k - 20k ---
  { id: 25, image: getPlaceholderImage('Realme C30', 'Realme'),                name: 'Realme C30',                price: 17999, brand: 'Realme'  },
  { id: 26, image: getPlaceholderImage('Infinix Smart 8', 'Infinix'),          name: 'Infinix Smart 8',           price: 14999, brand: 'Infinix' },
  { id: 27, image: getPlaceholderImage('Tecno Pop 8', 'Tecno'),                name: 'Tecno Pop 8',               price: 12999, brand: 'Tecno'   },
  { id: 28, image: getPlaceholderImage('Nokia C32', 'Nokia'),                  name: 'Nokia C32',                 price: 16999, brand: 'Nokia'   },
  { id: 29, image: getPlaceholderImage('Itel A70', 'Itel'),                    name: 'Itel A70',                  price: 10999, brand: 'Itel'    },
  { id: 30, image: getPlaceholderImage('Samsung Galaxy A05', 'Samsung'),       name: 'Samsung Galaxy A05',        price: 18999, brand: 'Samsung' },
];

// ✅ Latest = newest 6 (id descending)
export const latestMobiles: Mobile[] = [...allMobiles].sort((a, b) => b.id - a.id).slice(0, 6);

// ✅ Price se auto-filter
export const getMobilesByPriceRange = (min?: number, max?: number): Mobile[] => {
  return allMobiles.filter(mobile => {
    if (min !== undefined && max !== undefined) return mobile.price >= min && mobile.price <= max;
    if (min !== undefined) return mobile.price >= min;
    if (max !== undefined) return mobile.price <= max;
    return true;
  });
};

// ✅ Brand se auto-filter
export const getMobilesByBrand = (brand: string): Mobile[] => {
  return allMobiles.filter(m => m.brand.toLowerCase() === brand.toLowerCase());
};

// ✅ Pre-filtered exports — price se automatically detect
export const above50kMobiles  = getMobilesByPriceRange(50000);
export const between40to50k   = getMobilesByPriceRange(40000, 49999);
export const between30to40k   = getMobilesByPriceRange(30000, 39999);
export const between20to30k   = getMobilesByPriceRange(20000, 29999);
export const between10to20k   = getMobilesByPriceRange(10000, 19999);