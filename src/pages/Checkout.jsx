import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Create order object
      const order = {
        id: Date.now().toString(),
        items: items,
        total: getCartTotal() * 1.08,
        shipping: {
          ...formData,
          cardNumber: '**** **** **** ' + formData.cardNumber.slice(-4)
        },
        date: new Date().toISOString(),
        status: 'confirmed'
      };

      // Store order in localStorage (in a real app, this would go to a backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      clearCart();

      // Show success message
      addToast('Order placed successfully!', 'success');

      // Redirect to order confirmation
      navigate(`/order-confirmation/${order.id}`);

    } catch (error) {
      addToast('Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {t('yourCartIsEmpty')}
            </h1>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('addSomeItems')}
            </p>
            <button
              onClick={() => navigate('/')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {t('continueShopping')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {t('checkout')}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <div className={`rounded-lg shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t('shippingInformation')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('state')}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('zipCode')}
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className={`rounded-lg shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t('paymentInformation')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('cardNumber')}
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('expiryDate')}
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {t('cvv')}
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('nameOnCard')}
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className={`rounded-lg shadow-sm p-6 sticky top-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {t('orderSummary')}
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-16 h-16 object-contain rounded-lg p-2 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {t('quantity')}: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : ''}`} />

                {/* Order Totals */}
                <div className="space-y-2 mb-6">
                  <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span>{t('subtotal')}</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span>{t('shipping')}</span>
                    <span className="text-green-600">{t('free')}</span>
                  </div>
                  <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span>{t('tax')}</span>
                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : ''}`} />

                <div className={`flex justify-between text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <span>{t('total')}</span>
                  <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                      : 'bg-yellow-400 text-black hover:bg-yellow-500'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      {t('processing')}
                    </div>
                  ) : (
                    t('completeOrder')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;