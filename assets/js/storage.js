/* Cart & wishlist state, persisted to localStorage. Simple pub/sub so any
   part of the UI (header badges, cart drawer, wishlist page) can react to changes. */

const CART_KEY = "mobee-scents-cart";
const WISHLIST_KEY = "mobee-scents-wishlist";

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — fail silently */
  }
}

const Store = {
  _listeners: [],
  cart: readJSON(CART_KEY, []), // [{ productId, size, quantity }]
  wishlist: readJSON(WISHLIST_KEY, []), // [productId]

  onChange(fn) {
    this._listeners.push(fn);
  },
  _emit() {
    this._listeners.forEach((fn) => fn());
  },

  addToCart(productId, size, quantity) {
    quantity = quantity || 1;
    const existing = this.cart.find((i) => i.productId === productId && i.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, size, quantity });
    }
    writeJSON(CART_KEY, this.cart);
    this._emit();
  },
  removeFromCart(productId, size) {
    this.cart = this.cart.filter((i) => !(i.productId === productId && i.size === size));
    writeJSON(CART_KEY, this.cart);
    this._emit();
  },
  updateQuantity(productId, size, quantity) {
    if (quantity <= 0) return this.removeFromCart(productId, size);
    const item = this.cart.find((i) => i.productId === productId && i.size === size);
    if (item) item.quantity = quantity;
    writeJSON(CART_KEY, this.cart);
    this._emit();
  },
  cartLines() {
    return this.cart
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        const sizeInfo = product.sizes.find((s) => s.label === item.size) || product.sizes[0];
        return { ...item, product, unitPrice: sizeInfo.price };
      })
      .filter(Boolean);
  },
  cartCount() {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  },
  cartSubtotal() {
    return this.cartLines().reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  },

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  },
  toggleWishlist(productId) {
    if (this.isWishlisted(productId)) {
      this.wishlist = this.wishlist.filter((id) => id !== productId);
    } else {
      this.wishlist.push(productId);
    }
    writeJSON(WISHLIST_KEY, this.wishlist);
    this._emit();
  },
};
