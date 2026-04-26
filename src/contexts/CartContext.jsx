import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

// Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: [],
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const toast = useToast();
  const { user, isAuthenticated, logout } = useAuth();

  // Load cart from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } else {
        dispatch({ type: 'CLEAR_CART' });
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user]);

  // Save cart to localStorage whenever it changes and user is authenticated
  useEffect(() => {
    if (user && state.items.length >= 0) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(state.items));
    }
  }, [state.items, user]);

  // Clear cart on logout
  useEffect(() => {
    if (!isAuthenticated && state.items.length > 0) {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated, state.items.length]);

  const addToCart = useCallback((product) => {
    if (!isAuthenticated) {
      toast.addToast('Please sign in to add items to your cart', 'warning');
      return;
    }

    const existingItem = state.items.find(item => item.id === product.id);
    dispatch({ type: 'ADD_TO_CART', payload: product });

    // Show toast notification
    if (existingItem) {
      toast.addToast(`"${product.title.substring(0, 30)}..." quantity updated in cart!`, 'success');
    } else {
      toast.addToast(`"${product.title.substring(0, 30)}..." added to cart!`, 'success');
    }
  }, [state.items, toast, isAuthenticated]);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });

    // Show toast notification
    toast.addToast('Item removed from cart', 'info');
  }, [toast]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });

      // Show toast notification for quantity update
      toast.addToast('Cart updated', 'info');
    }
  }, [removeFromCart, toast]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });

    // Show toast notification
    toast.addToast('Cart cleared', 'info');
  }, [toast]);

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};