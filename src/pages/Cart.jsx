import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect } from 'react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('yourCartIsEmpty')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('looksLikeEmpty')}</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('shoppingCart')}</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            {t('clearCart')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg p-2"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-green-600 dark:text-green-400 font-bold">${item.price}</p>
                    </div>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-gray-800 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
                      >
                        +
                      </button>
                    </div>
                    <div className={`text-right ${isRTL ? 'text-left' : ''}`}>
                      <p className="font-bold text-gray-800 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm mt-1"
                      >
                        {t('remove')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('orderSummary')}</h2>

              <div className="space-y-2 mb-4">
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600 dark:text-gray-400">{t('subtotal')} ({items.length} {t('items')})</span>
                  <span className="text-gray-800 dark:text-white">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600 dark:text-gray-400">{t('shipping')}</span>
                  <span className="text-green-600 dark:text-green-400">{t('free')}</span>
                </div>
                <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600 dark:text-gray-400">{t('tax')}</span>
                  <span className="text-gray-800 dark:text-white">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-4 border-gray-200 dark:border-gray-700" />

              <div className={`flex justify-between text-lg font-bold mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-800 dark:text-white">{t('total')}</span>
                <span className="text-gray-800 dark:text-white">${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-semibold mb-3"
              >
                {t('proceedToCheckout')}
              </button>

              <Link
                to="/"
                className="block w-full text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 py-2"
              >
                {t('continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;