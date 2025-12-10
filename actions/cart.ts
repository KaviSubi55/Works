'use server'

import { createClient } from "@/utils/supabase/server-client"

export interface CartItem {
  id: string
  product_id: string
  product_name: string
  product_type: string // 'accommodation', 'ski_pass', 'rental', 'package', etc.
  quantity: number
  price: number
  details?: any // Additional product-specific details
}

/**
 * Get cart items for the current logged-in user
 */
export const getCartItems = async (): Promise<{ data: CartItem[] | null; error: string | null }> => {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "User not authenticated" }
    }

    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data || [], error: null }
  } catch (err) {
    return { data: null, error: "Failed to fetch cart items" }
  }
}

/**
 * Add item to cart
 */
export const addToCart = async (item: Omit<CartItem, 'id'>): Promise<{ data: CartItem | null; error: string | null }> => {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "User not authenticated" }
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', item.product_id)
      .single()

    if (existingItem) {
      // Update quantity if item exists
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + item.quantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert([{
          user_id: user.id,
          ...item
        }])
        .select()
        .single()

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    }
  } catch (err) {
    return { data: null, error: "Failed to add item to cart" }
  }
}

/**
 * Update cart item quantity
 */
export const updateCartItem = async (itemId: string, quantity: number): Promise<{ error: string | null }> => {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "User not authenticated" }
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id)

      if (error) {
        return { error: error.message }
      }
    } else {
      // Update quantity
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .eq('user_id', user.id)

      if (error) {
        return { error: error.message }
      }
    }

    return { error: null }
  } catch (err) {
    return { error: "Failed to update cart item" }
  }
}

/**
 * Remove item from cart
 */
export const removeFromCart = async (itemId: string): Promise<{ error: string | null }> => {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "User not authenticated" }
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (err) {
    return { error: "Failed to remove item from cart" }
  }
}

/**
 * Clear all cart items for the current user
 */
export const clearCart = async (): Promise<{ error: string | null }> => {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "User not authenticated" }
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (err) {
    return { error: "Failed to clear cart" }
  }
}
