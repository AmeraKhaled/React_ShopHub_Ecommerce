import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getProducts, getProductsByCategory, getCategories } from "../api";
import ProductCard from "../components/productCard";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (category) {
      getProductsByCategory(category).then(setAllProducts);
    } else {
      getProducts().then(setAllProducts);
    }
  }, [category]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case "relevance":
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [allProducts, searchTerm, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in real-time via useMemo
  };

  const handleCategoryChange = (newCategory) => {
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('welcomeTo')} ShopHub</h1>
          <p className="text-xl mb-8">{t('discoverAmazing')}</p>
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('search')}
                className="w-full px-4 py-3 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 py-8 shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('shopByCategory')}</h2>
          <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : ''}`}>
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-6 py-3 rounded-full border-2 transition-colors ${
                !category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-600'
              }`}
            >
              {t('allProducts')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-3 rounded-full border-2 capitalize transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {category ? `${category} ${t('featuredProducts').toLowerCase()}` : searchTerm ? `${t('searchResults')} "${searchTerm}"` : t('featuredProducts')}
            </h2>
          </div>
          <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <span className="text-gray-600 dark:text-gray-400 font-medium">{t('sortBy')}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="relevance">{t('relevance')}</option>
              <option value="price-low">{t('priceLowToHigh')}</option>
              <option value="price-high">{t('priceHighToLow')}</option>
              <option value="rating">{t('highestRated')}</option>
            </select>
          </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('noProductsFound')}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm ? t('tryAdjustingSearch') : t('noProductsInCategory')}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('clearSearch')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
