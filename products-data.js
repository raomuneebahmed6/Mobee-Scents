const PRODUCTS = {
  'after-hours': {
    name: 'After Hours', price: 2490, badge: 'Best seller', meta: 'For Him', cat: 'men woody',
    rating: 4.9, reviews: 268, sub: 'Citrus · Cedar · Amber',
    img: 'https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19mb19hX21pbmltYWxfcGVyZnVtZV9ib3R0bGVfaXNvbGF0ZWRfb25fd19lNjU2NjExOS1iYjRiLTRhMmEtOGQyYi0xYTg3YjZmNjYzYTdfMS5qcGc.jpg',
    top: 'Bergamot, Grapefruit', heart: 'Pink Pepper, Cedar', base: 'Amber, Musk, Vetiver',
    lead: 'A smooth woody-amber fragrance made for evenings, dinners and days when you want a little more presence. Fresh at first, warm on the skin later.',
    longevity: 86, projection: 74, sweetness: 46, freshness: 63,
    smells: 'It opens bright and citrusy, turns dry and woody through the middle, and settles into a warm amber-musk trail. Refined rather than loud.',
    wear: 'Best for evenings, dinners, office-to-evening wear, autumn and winter. Also works in air-conditioned summer settings.'
  },
  'soft-spoken': {
    name: 'Soft Spoken', price: 2290, badge: '10% off', meta: 'For Her', cat: 'women floral',
    rating: 4.8, reviews: 194, sub: 'Pear · Jasmine · Vanilla',
    img: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTExL3NyLWltYWdlLTA1MTEyMDI1LXJlMTgtcy0xNzE2XzEuanBn.jpg',
    top: 'Pear, Bergamot', heart: 'Jasmine, Peony', base: 'Vanilla, White Musk',
    lead: 'A gentle fruity-floral eau de parfum with a soft vanilla dry down — easy to wear from morning meetings to evening dinners.',
    longevity: 70, projection: 58, sweetness: 72, freshness: 55,
    smells: 'Opens with juicy pear and bergamot, blooms into jasmine and peony, and finishes on a soft vanilla-musk base. Comforting, never overpowering.',
    wear: 'Great for daytime wear and office settings, spring and summer. Layer with a woody scent for evenings.'
  },
  'sandal-verse': {
    name: 'Sandal Verse', price: 2790, badge: 'Unisex', meta: 'Unisex', cat: 'unisex woody',
    rating: 4.7, reviews: 151, sub: 'Saffron · Sandalwood · Musk',
    img: 'assets/img/santal-33-bottle.jpg',
    top: 'Saffron, Cardamom', heart: 'Sandalwood, Rose', base: 'Musk, Amber',
    lead: 'A creamy, spiced sandalwood composition — warm and grounding, equally at home on him or her.',
    longevity: 82, projection: 66, sweetness: 38, freshness: 44,
    smells: 'Spiced saffron and cardamom open into a rich, creamy sandalwood heart, settling into a soft musk-amber base that lingers on skin.',
    wear: 'Versatile year-round wear; especially good for cooler evenings and formal occasions.'
  },
  'oud-no-07': {
    name: 'Oud No. 07', price: 3490, badge: 'Premium oud', meta: 'Unisex', cat: 'unisex oud',
    rating: 4.9, reviews: 212, sub: 'Rose · Oud · Amber',
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/f0ac6f123657833.60f2d559e8964.jpg',
    top: 'Rose, Saffron', heart: 'Oud, Patchouli', base: 'Amber, Musk',
    lead: 'A deep, resinous oud built around Turkish rose — rich, long-lasting and unmistakably premium.',
    longevity: 92, projection: 80, sweetness: 34, freshness: 28,
    smells: 'Rose and saffron open bright before giving way to a smoky, resinous oud heart and a warm amber-musk finish that can last a full day.',
    wear: 'Best suited to fall/winter, evening events, and anyone who wants a scent that fills the room.'
  },
  'first-light': {
    name: 'First Light', price: 2190, badge: 'New', meta: 'For Her', cat: 'women floral',
    rating: 4.8, reviews: 88, sub: 'Mandarin · Peony · Musk',
    img: 'https://parfumsuite.ch/cdn/shop/articles/nischenduefte_c59643fb-7b12-4396-9039-5af1d893b2b0.png?v=1770029534&width=1200',
    top: 'Mandarin, Bergamot', heart: 'Peony, Freesia', base: 'White Musk, Cedar',
    lead: 'A bright, citrus-floral opener for mornings that need a little optimism — light, clean and easy to wear daily.',
    longevity: 60, projection: 50, sweetness: 48, freshness: 78,
    smells: 'Zesty mandarin and bergamot lead into a soft peony-freesia heart, finishing on a clean white musk that never feels heavy.',
    wear: 'Perfect for daytime, warmer months, and everyday office wear.'
  },
  'night-drive': {
    name: 'Night Drive', price: 2590, badge: 'Popular', meta: 'For Him', cat: 'men woody',
    rating: 4.9, reviews: 176, sub: 'Grapefruit · Pepper · Vetiver',
    img: 'https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19mb19hX21pbmltYWxfcGVyZnVtZV9ib3R0bGVfaXNvbGF0ZWRfb25fd19lNjU2NjExOS1iYjRiLTRhMmEtOGQyYi0xYTg3YjZmNjYzYTdfMS5qcGc.jpg',
    top: 'Grapefruit, Pink Pepper', heart: 'Lavender, Geranium', base: 'Vetiver, Amber',
    lead: 'A crisp, peppery vetiver built for after-dark energy — confident without trying too hard.',
    longevity: 78, projection: 70, sweetness: 30, freshness: 68,
    smells: 'Sharp grapefruit and pink pepper open into a herbal lavender-geranium heart, grounded by dry vetiver and warm amber.',
    wear: 'Ideal for nights out, autumn evenings, and anyone who prefers fresh-woody over sweet.'
  },
  'rose-theory': {
    name: 'Rose Theory', price: 2390, badge: 'Fresh', meta: 'For Her', cat: 'women floral',
    rating: 4.7, reviews: 104, sub: 'Rose · Lychee · White Musk',
    img: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTExL3NyLWltYWdlLTA1MTEyMDI1LXJlMTgtcy0xNzE2XzEuanBn.jpg',
    top: 'Lychee, Bergamot', heart: 'Rose, Peony', base: 'White Musk, Cedar',
    lead: 'A modern take on rose — juicy lychee up top keeps it from feeling old-fashioned, with a soft musky finish.',
    longevity: 64, projection: 52, sweetness: 60, freshness: 62,
    smells: 'Juicy lychee and bergamot open into a true rose-peony heart, settling into clean white musk and soft cedar.',
    wear: 'Lovely for spring/summer, daytime wear, and rose lovers who want something less classic.'
  },
  'amber-room': {
    name: 'Amber Room', price: 2990, badge: 'Rich Amber', meta: 'Unisex', cat: 'unisex oud woody',
    rating: 4.8, reviews: 142, sub: 'Labdanum · Amber · Vanilla',
    img: 'https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsX29mZmljZV8yNV9zdGlsbF9saWZlX3Nob3Rfb2Zfc2ltcGxlX3BlcmZ1bWVfcGFja2FnaW5nX19jOTYzYzY5Zi00ZjMzLTQyM2UtYmJkNC0yOWEyYWJmMmMwYzlfMS5qcGc.jpg',
    top: 'Bergamot, Pink Pepper', heart: 'Labdanum, Amber', base: 'Vanilla, Musk, Woods',
    lead: 'A cozy, resinous amber built for cold-weather wear — think fireplace and cashmere in a bottle.',
    longevity: 88, projection: 72, sweetness: 66, freshness: 24,
    smells: 'Opens with a brief citrus-pepper flash before settling into rich labdanum-amber and a warm vanilla-woods base.',
    wear: 'Best for winter, evenings, and anyone who loves warm, sweet, resinous scents.'
  },
  'tuscan-leather': {
    name: 'Tuscan Leather', price: 3290, badge: 'Niche', meta: 'Unisex', cat: 'unisex woody',
    rating: 4.7, reviews: 58, sub: 'Raspberry · Leather · Amber',
    img: 'assets/img/tuscan-leather.png',
    top: 'Raspberry, Saffron', heart: 'Leather, Suede', base: 'Amber, Thyme, Olibanum',
    lead: 'A bold, full-bodied leather built around tart raspberry and rugged suede — distinctive, long-lasting, and unmistakably premium.',
    longevity: 90, projection: 76, sweetness: 40, freshness: 30,
    smells: 'Opens with a sharp raspberry-saffron burst, moves into rich leather and suede, and settles into warm amber and thyme.',
    wear: 'Best for evenings, colder months, and anyone who wants a scent that makes a statement.'
  },
  'red-tobacco': {
    name: 'Red Tobacco', price: 2990, badge: 'New', meta: 'For Him', cat: 'men woody',
    rating: 4.6, reviews: 47, sub: 'Tobacco · Cocoa · Vanilla',
    img: 'assets/img/red-tobacco.png',
    top: 'Tobacco Leaf, Spices', heart: 'Dried Fruits, Cocoa', base: 'Vanilla, Tonka Bean, Amber',
    lead: 'A rich, dessert-like tobacco with dried fruit and cocoa at its heart — warm, inviting and built to last all night.',
    longevity: 88, projection: 70, sweetness: 74, freshness: 26,
    smells: 'Spiced tobacco leaf opens into sweet dried fruit and cocoa, finishing on a smooth vanilla-tonka base.',
    wear: 'Perfect for cold evenings, celebrations, and anyone who loves warm gourmand fragrances.'
  },
  'janan-sports': {
    name: 'Janan Sports', price: 2090, badge: 'New', meta: 'For Him', cat: 'men woody',
    rating: 4.5, reviews: 39, sub: 'Bergamot · Marine · Musk',
    img: 'assets/img/janan-sports.png',
    top: 'Bergamot, Mint', heart: 'Marine Notes, Lavender', base: 'Musk, Cedar, Ambroxan',
    lead: 'A clean, energetic fresh scent built for the gym, the commute and everything in between — light, sporty and easy to wear daily.',
    longevity: 62, projection: 55, sweetness: 30, freshness: 82,
    smells: 'Crisp bergamot and mint open into an airy marine-lavender heart, grounded by clean musk and cedar.',
    wear: 'Ideal for daytime, workouts, summer, and anyone who wants a low-effort everyday fresh scent.'
  },
  'dior-sauvage': {
    name: 'Dior Sauvage', price: 2890, badge: 'Popular', meta: 'For Him', cat: 'men woody',
    rating: 4.8, reviews: 220, sub: 'Bergamot · Pepper · Ambroxan',
    img: 'assets/img/dior-sauvage.png',
    top: 'Calabrian Bergamot, Pepper', heart: 'Sichuan Pepper, Lavender, Geranium', base: 'Ambroxan, Cedar, Vanilla',
    lead: 'Our most requested impression — fresh peppery bergamot over a clean, radiant ambroxan-cedar base. Instantly recognizable, endlessly versatile.',
    longevity: 80, projection: 78, sweetness: 36, freshness: 70,
    smells: 'Bright bergamot and pepper open into a spicy lavender-geranium heart, drying down to a smooth, radiant ambroxan-cedar trail.',
    wear: 'Works year-round for almost any occasion — office, dates, everyday wear.'
  }
};

const TESTER_SIZES = {
  'after-hours': { 5: 350, 10: 550 },
  'soft-spoken': { 5: 350, 10: 550 },
  'sandal-verse': { 5: 380, 10: 590 },
  'oud-no-07': { 5: 420, 10: 650 }
};

const BOXES = {
  'tester-box-5ml': { name: 'Discovery Tester Box — 5ml (Set of 4)', price: 1200, size: '5ml', includes: ['after-hours', 'soft-spoken', 'sandal-verse', 'oud-no-07'] },
  'tester-box-10ml': { name: 'Discovery Tester Box — 10ml (Set of 4)', price: 1900, size: '10ml', includes: ['after-hours', 'soft-spoken', 'sandal-verse', 'oud-no-07'] }
};
