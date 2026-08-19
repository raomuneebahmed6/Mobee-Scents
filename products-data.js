const PRODUCTS = {
  'tuscan-leather': {
    name: 'Tuscan Leather', price: 3290, badge: 'Niche', meta: 'Unisex', cat: 'unisex woody leather',
    rating: 4.7, reviews: 58, sub: 'Raspberry · Suede · Leather',
    img: 'assets/img/tuscan-leather.png',
    top: 'Raspberry, Saffron, Black Suede', heart: 'Violet Leaf, Jasmine Sambac, Tobacco Flower', base: 'Olibanum, Ambroxan',
    lead: 'A raw yet refined leather composition — jammy raspberry meets rugged black suede, wrapped in night-blooming jasmine.',
    longevity: 90, projection: 76, sweetness: 40, freshness: 30,
    smells: 'Opens with a bold, almost jammy raspberry burst over black suede, moves into night-blooming jasmine and violet leaf, and settles into warm olibanum and smooth ambroxan.',
    wear: 'Best for evenings, colder months, and anyone who wants a distinctive scent that leaves a lasting impression.'
  },
  'red-tobacco': {
    name: 'Red Tobacco', price: 2990, badge: 'Niche', meta: 'Unisex', cat: 'unisex woody oud',
    rating: 4.6, reviews: 47, sub: 'Saffron · Oud · Vanilla',
    img: 'assets/img/red-tobacco.png',
    top: 'Saffron, Cinnamon, Incense, Nutmeg, White Peach, Green Apple, Nepalese Oud', heart: 'Patchouli, Jasmine', base: 'Amber, Vetiver, Vanilla Pods, White Musk',
    lead: 'A rich, smoky-sweet composition — warm spice and agarwood over a plush vanilla-amber base.',
    longevity: 90, projection: 74, sweetness: 60, freshness: 22,
    smells: 'Opens with warm saffron, cinnamon and a hint of Nepalese oud, moves into a soft patchouli-jasmine heart, and finishes on plush vanilla, amber and white musk.',
    wear: 'Perfect for cold evenings, celebrations, and anyone who loves a smoky, oud-forward gourmand.'
  },
  'janan-sports': {
    name: 'Janan Sports', price: 2090, badge: 'Everyday Fresh', meta: 'For Him', cat: 'men fresh',
    rating: 4.5, reviews: 39, sub: 'Bergamot · Pineapple · Marine',
    img: 'assets/img/janan-sports.png',
    top: 'Bergamot, Lemon, Pineapple, Pink Pepper, Blackcurrant, Plum, Mandarin, Marine Accord', heart: 'Rose, Geranium, Jasmine, Lily of the Valley', base: 'Musk, Woods',
    lead: 'A fresh, vibrant fragrance for the modern, active man — bright citrus and fruit over a clean floral-marine heart.',
    longevity: 62, projection: 55, sweetness: 34, freshness: 84,
    smells: 'Zesty citrus and juicy fruits open into a delicate floral bouquet, settling into a clean musky base that never feels heavy.',
    wear: 'Ideal for daytime, workouts, summer, and anyone who wants a low-effort everyday fresh scent.'
  },
  'dior-sauvage': {
    name: 'Dior Sauvage', price: 2890, badge: 'Popular', meta: 'For Him', cat: 'men fresh woody amber',
    rating: 4.8, reviews: 220, sub: 'Bergamot · Pepper · Ambroxan',
    img: 'assets/img/dior-sauvage.png',
    top: 'Calabrian Bergamot', heart: 'Sichuan Pepper, Lavender, Star Anise', base: 'Vanilla, Ambroxan',
    lead: 'Our most requested designer icon — fresh peppery bergamot over a radiant, smoky ambroxan-vanilla base. Instantly recognizable, endlessly versatile.',
    longevity: 85, projection: 78, sweetness: 40, freshness: 70,
    smells: 'Bright Calabrian bergamot opens into a spicy pepper-lavender heart with a touch of star anise, drying down to a warm vanilla-ambroxan trail with real staying power.',
    wear: 'Works year-round for almost any occasion — office, dates, everyday wear.'
  },
  'janan-gold': {
    name: 'Janan Gold', price: 2390, badge: 'Oriental', meta: 'For Him', cat: 'men oriental amber',
    rating: 4.6, reviews: 33, sub: 'Spice · Amber · Musk',
    img: 'assets/img/janan-gold.png',
    top: 'Sweet Spices', heart: 'Amber, Florals', base: 'Musk, Woods',
    lead: 'A luxurious, oriental fragrance from the celebrated Janan line — rich, long-lasting and made for gifting.',
    longevity: 84, projection: 68, sweetness: 58, freshness: 34,
    smells: 'Opens with warm sweet spice, blooms into a floral-amber heart, and settles into a smooth, long-lasting musk base.',
    wear: 'Best for evenings, formal occasions and gifting — a rich scent that lingers for hours.'
  },
  'dunhill-desire': {
    name: 'Dunhill Desire', price: 3190, badge: 'Classic', meta: 'For Him', cat: 'men woody amber',
    rating: 4.5, reviews: 28, sub: 'Bergamot · Rose · Teak Wood',
    img: 'assets/img/dunhill-desire.png',
    top: 'Bergamot, Lime, Neroli, Apple', heart: 'Patchouli, Rose, Teak Wood', base: 'Vanilla, Musk, Labdanum',
    lead: 'A distinctive, sensual amber-woody classic — sharp citrus up top with a warm, seductive dry down.',
    longevity: 76, projection: 64, sweetness: 44, freshness: 52,
    smells: 'Crisp bergamot, lime and apple open into a woody rose-patchouli heart, finishing on warm vanilla, musk and labdanum.',
    wear: 'Versatile year-round wear; equally suited to the office and evening occasions.'
  },
  'creed-aventus': {
    name: 'Creed Aventus', price: 3590, badge: 'Niche', meta: 'For Him', cat: 'men fresh fruity woody',
    rating: 4.9, reviews: 65, sub: 'Pineapple · Birch · Ambergris',
    img: 'assets/img/creed-aventus.png',
    top: 'Apple, Blackcurrant, Pineapple, Bergamot', heart: 'Jasmine, Birch, Juniper Berries', base: 'Oakmoss, Vanilla, Ambergris',
    lead: "Our take on the world's most iconic niche fragrance — smoky pineapple and blackcurrant over a sophisticated woody-ambergris base.",
    longevity: 88, projection: 82, sweetness: 32, freshness: 60,
    smells: 'A tantalising citrus-fruit opening leads into a fresh, smoky birch heart, settling into oakmoss, vanilla and ambergris for a confident, versatile finish.',
    wear: 'Suited to almost any occasion — a sophisticated everyday signature with serious longevity and projection.'
  },
  'silk-musk': {
    name: 'Silk Musk', price: 1990, badge: 'Everyday Musk', meta: 'Unisex', cat: 'unisex musk floral',
    rating: 4.4, reviews: 21, sub: 'Rose · Sandalwood · Musk',
    img: 'assets/img/silk-musk.png',
    top: 'Silk Accord, Bergamot', heart: 'Rose, Violet', base: 'Sandalwood, White Musk',
    lead: 'A soft, comforting musk built around silky rose and creamy sandalwood — easy to wear daily, on anyone.',
    longevity: 68, projection: 48, sweetness: 50, freshness: 50,
    smells: 'Opens light and silky, blooms into a gentle rose-violet heart, and settles into a warm, powdery sandalwood-musk base that sits close to the skin.',
    wear: 'Great for daily wear, layering, and anyone who prefers soft, clean musks over heavy scents.'
  }
};

const TESTER_SIZES = {
  'tuscan-leather': { 5: 450, 10: 700 },
  'red-tobacco': { 5: 400, 10: 630 },
  'janan-sports': { 5: 300, 10: 470 },
  'dior-sauvage': { 5: 400, 10: 620 },
  'janan-gold': { 5: 330, 10: 520 },
  'dunhill-desire': { 5: 440, 10: 690 },
  'creed-aventus': { 5: 490, 10: 770 },
  'silk-musk': { 5: 280, 10: 440 }
};

const BOXES = {
  'tester-box-5ml': { name: 'Signature Discovery Box — 5ml (Set of 4)', price: 1400, size: '5ml', includes: ['dior-sauvage', 'dunhill-desire', 'creed-aventus', 'janan-sports'] },
  'tester-box-10ml': { name: 'Signature Discovery Box — 10ml (Set of 4)', price: 2200, size: '10ml', includes: ['dior-sauvage', 'dunhill-desire', 'creed-aventus', 'janan-sports'] },
  'niche-box-5ml': { name: 'Niche & Oriental Box — 5ml (Set of 4)', price: 1250, size: '5ml', includes: ['tuscan-leather', 'red-tobacco', 'janan-gold', 'silk-musk'] },
  'niche-box-10ml': { name: 'Niche & Oriental Box — 10ml (Set of 4)', price: 1990, size: '10ml', includes: ['tuscan-leather', 'red-tobacco', 'janan-gold', 'silk-musk'] }
};
