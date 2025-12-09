/**
 * Get the user-specific cart key for localStorage
 * @returns The cart key specific to the current user or guest
 */
export const getCartKey = (): string => {
  const username = localStorage.getItem('username');
  return username ? `cartItems_${username}` : 'cartItems_guest';
};

/**
 * Get cart items for the current user
 * @returns Array of cart items for the logged-in user
 */
export const getCartItems = (): any[] => {
  const cartKey = getCartKey();
  return JSON.parse(localStorage.getItem(cartKey) || '[]');
};

/**
 * Save cart items for the current user
 * @param items Array of cart items to save
 */
export const setCartItems = (items: any[]): void => {
  const cartKey = getCartKey();
  localStorage.setItem(cartKey, JSON.stringify(items));
};

/**
 * Clear cart for the current user
 */
export const clearCart = (): void => {
  const cartKey = getCartKey();
  localStorage.removeItem(cartKey);
};
