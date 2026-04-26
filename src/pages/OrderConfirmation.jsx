import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order from localStorage (in a real app, this would be an API call)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Order #{order.id}</h2>
                <p className="text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-2"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium">{order.shipping.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="font-medium">{order.shipping.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Address</p>
                <p className="font-medium">
                  {order.shipping.address}<br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
            <div className="flex items-center space-x-4">
              <div className="text-2xl">💳</div>
              <div>
                <p className="font-medium">{order.shipping.cardName}</p>
                <p className="text-gray-600 text-sm">{order.shipping.cardNumber}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;