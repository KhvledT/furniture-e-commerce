// localStorage utilities for cart, wishlist, addresses, and orders

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
}

export interface Address {
  id: string;
  name: string;
  type: 'HOME' | 'OFFICE' | 'OTHER';
  address: string;
  contact: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface Order {
  id: string;
  orderDate: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

// ========== CART UTILITIES ==========

const CART_KEY = 'cozy_cart';
const WISHLIST_KEY = 'cozy_wishlist';
const ADDRESSES_KEY = 'cozy_addresses';
const PAYMENT_METHODS_KEY = 'cozy_payment_methods';
const ORDERS_KEY = 'cozy_orders';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cartData = localStorage.getItem(CART_KEY);
  return cartData ? JSON.parse(cartData) : [];
}

export function setCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(productId: string, quantity: number = 1, color?: string): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === productId && item.selectedColor === color
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ productId, quantity, selectedColor: color });
  }

  setCart(cart);
}

export function removeFromCart(productId: string, color?: string): void {
  const cart = getCart();
  const newCart = cart.filter(
    (item) => !(item.productId === productId && item.selectedColor === color)
  );
  setCart(newCart);
}

export function updateCartQuantity(
  productId: string,
  quantity: number,
  color?: string
): void {
  if (quantity <= 0) {
    removeFromCart(productId, color);
    return;
  }

  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === productId && item.selectedColor === color
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity = quantity;
    setCart(cart);
  }
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// ========== WISHLIST UTILITIES ==========

export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  const wishlistData = localStorage.getItem(WISHLIST_KEY);
  return wishlistData ? JSON.parse(wishlistData) : [];
}

export function setWishlist(wishlist: WishlistItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function addToWishlist(productId: string): void {
  const wishlist = getWishlist();
  if (!wishlist.some((item) => item.productId === productId)) {
    wishlist.push({ productId });
    setWishlist(wishlist);
  }
}

export function removeFromWishlist(productId: string): void {
  const wishlist = getWishlist();
  const newWishlist = wishlist.filter((item) => item.productId !== productId);
  setWishlist(newWishlist);
}

export function isInWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.productId === productId);
}

// ========== ADDRESSES UTILITIES ==========

export function getAddresses(): Address[] {
  if (typeof window === 'undefined') return [];
  const addressesData = localStorage.getItem(ADDRESSES_KEY);
  return addressesData ? JSON.parse(addressesData) : [];
}

export function setAddresses(addresses: Address[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
}

export function addAddress(address: Address): void {
  const addresses = getAddresses();
  addresses.push(address);
  setAddresses(addresses);
}

export function removeAddress(addressId: string): void {
  const addresses = getAddresses();
  const newAddresses = addresses.filter((addr) => addr.id !== addressId);
  setAddresses(newAddresses);
}

// ========== PAYMENT METHODS UTILITIES ==========

export function getPaymentMethods(): PaymentMethod[] {
  if (typeof window === 'undefined') return [];
  const paymentData = localStorage.getItem(PAYMENT_METHODS_KEY);
  return paymentData ? JSON.parse(paymentData) : [];
}

export function setPaymentMethods(methods: PaymentMethod[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(methods));
}

export function addPaymentMethod(method: PaymentMethod): void {
  const methods = getPaymentMethods();
  methods.push(method);
  setPaymentMethods(methods);
}

export function removePaymentMethod(methodId: string): void {
  const methods = getPaymentMethods();
  const newMethods = methods.filter((method) => method.id !== methodId);
  setPaymentMethods(newMethods);
}

// ========== ORDERS UTILITIES ==========

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  const ordersData = localStorage.getItem(ORDERS_KEY);
  return ordersData ? JSON.parse(ordersData) : [];
}

export function setOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  setOrders(orders);
  clearCart();
}

// Initialize demo data if localStorage is empty
export function initializeDemoData(): void {
  if (typeof window === 'undefined') return;

  // Initialize default addresses if none exist
  const addresses = getAddresses();
  if (addresses.length === 0) {
    setAddresses([
      {
        id: '1',
        name: 'Huzefa Bagwala',
        type: 'HOME',
        address: '1131 Dusty Townline, Jacksonville',
        contact: '(936) 361-0310',
        city: 'Jacksonville',
        state: 'TX',
        zipCode: '40322',
        country: 'United States',
      },
      {
        id: '2',
        name: 'IndiaTech',
        type: 'OFFICE',
        address: '1219 Harvest Path, Jacksonville',
        contact: '(936) 361-0310',
        city: 'Jacksonville',
        state: 'TX',
        zipCode: '40326',
        country: 'United States',
      },
    ]);
  }

  // Initialize default payment methods if none exist
  const paymentMethods = getPaymentMethods();
  if (paymentMethods.length === 0) {
    setPaymentMethods([
      {
        id: '1',
        cardNumber: '6754',
        cardHolder: 'John Doe',
        expiryMonth: '06',
        expiryYear: '2021',
        cvv: '123',
      },
      {
        id: '2',
        cardNumber: '5643',
        cardHolder: 'Jane Smith',
        expiryMonth: '11',
        expiryYear: '2025',
        cvv: '456',
      },
    ]);
  }
}

