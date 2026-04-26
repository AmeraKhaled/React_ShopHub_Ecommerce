import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api";
import { useCart } from "../contexts/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-2xl">★</span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-2xl">☆</span>
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-2xl">☆</span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2 text-gray-500">›</span>
            <Link to={`/?category=${product.category}`} className="text-blue-600 hover:underline capitalize">
              {product.category}
            </Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-gray-700">{product.title.substring(0, 30)}...</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-96 object-contain bg-white p-8 rounded-lg shadow-sm"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating?.rate || 0)}
              </div>
              <span className="text-lg text-gray-600">
                {product.rating?.rate || 0} out of 5 stars
              </span>
              <span className="text-gray-500 ml-2">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <div className="text-4xl font-bold text-green-600 mb-6">
              ${product.price}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About this item</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors font-semibold text-lg"
              >
                Add to Cart
              </button>
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg">
                Buy Now
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Shipping & Returns</h4>
              <p className="text-sm text-gray-600">Free shipping on orders over $25. Easy returns within 30 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
