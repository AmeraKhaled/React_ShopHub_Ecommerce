import { createContext, useContext, useState, useEffect } from 'react';

// Language Context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);

    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const translations = {
    en: {
      // Navigation
      home: 'Home',
      cart: 'Cart',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      search: 'Search for products...',
      allProducts: 'All Products',
      shopByCategory: 'Shop by Category',
      featuredProducts: 'Featured Products',
      searchResults: 'Search Results for',
      sortBy: 'Sort by:',
      relevance: 'Relevance',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      items: 'items',
      noProductsFound: 'No products found',
      tryAdjustingSearch: 'Try adjusting your search terms or browse our categories.',
      noProductsInCategory: 'No products available in this category.',
      clearSearch: 'Clear Search',
      productsFound: 'products found',
      productFound: 'product found',

      // Cart
      shoppingCart: 'Shopping Cart',
      clearCart: 'Clear Cart',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Tax',
      total: 'Total',
      free: 'FREE',
      proceedToCheckout: 'Proceed to Checkout',
      continueShopping: 'Continue Shopping',
      yourCartIsEmpty: 'Your cart is empty',
      looksLikeEmpty: 'Looks like you haven\'t added any items to your cart yet.',
      addSomeItems: 'Add some items to your cart before checking out.',
      itemRemoved: 'Item removed from cart',
      cartUpdated: 'Cart updated',
      cartCleared: 'Cart cleared',
      remove: 'Remove',

      // Product Details
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      productDetails: 'Product Details',
      category: 'Category',
      rating: 'Rating',
      reviews: 'reviews',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      description: 'Description',

      // Checkout
      checkout: 'Checkout',
      shippingInformation: 'Shipping Information',
      paymentInformation: 'Payment Information',
      orderSummary: 'Order Summary',
      completeOrder: 'Complete Order',
      processing: 'Processing...',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      nameOnCard: 'Name on Card',

      // Order Confirmation
      orderConfirmed: 'Order Confirmed!',
      thankYou: 'Thank you for your purchase. Your order has been successfully placed.',
      orderDetails: 'Order Details',
      placedOn: 'Placed on',
      at: 'at',
      confirmed: 'Confirmed',
      orderItems: 'Order Items',
      quantity: 'Quantity',
      printReceipt: 'Print Receipt',

      // Auth
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      dontHaveAccount: 'Don\'t have an account?',
      alreadyHaveAccount: 'Already have an account?',
      forgotPassword: 'Forgot Password?',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      confirmPassword: 'Confirm your password',
      enterName: 'Enter your name',

      // Hero
      welcomeTo: 'Welcome to',
      discoverAmazing: 'Discover amazing products at great prices',

      // Theme
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      language: 'العربية'
    },
    ar: {
      // Navigation
      home: 'الرئيسية',
      cart: 'السلة',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      search: 'البحث عن المنتجات...',
      allProducts: 'جميع المنتجات',
      shopByCategory: 'التسوق حسب الفئة',
      featuredProducts: 'المنتجات المميزة',
      searchResults: 'نتائج البحث عن',
      sortBy: 'ترتيب حسب:',
      relevance: 'الصلة',
      priceLowToHigh: 'السعر: من الأقل للأعلى',
      priceHighToLow: 'السعر: من الأعلى للأقل',
      items: 'عناصر',
      noProductsFound: 'لم يتم العثور على منتجات',
      tryAdjustingSearch: 'جرب تعديل مصطلحات البحث أو تصفح فئاتنا.',
      noProductsInCategory: 'لا توجد منتجات متاحة في هذه الفئة.',
      clearSearch: 'مسح البحث',
      productsFound: 'منتج تم العثور عليه',
      productFound: 'منتجات تم العثور عليها',

      // Cart
      shoppingCart: 'سلة التسوق',
      clearCart: 'إفراغ السلة',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      tax: 'الضريبة',
      total: 'المجموع',
      free: 'مجاني',
      proceedToCheckout: 'المتابعة للدفع',
      continueShopping: 'متابعة التسوق',
      yourCartIsEmpty: 'سلة التسوق فارغة',
      looksLikeEmpty: 'يبدو أنك لم تضف أي عناصر إلى سلة التسوق بعد.',
      addSomeItems: 'أضف بعض العناصر إلى سلة التسوق قبل الدفع.',
      itemRemoved: 'تم إزالة العنصر من السلة',
      cartUpdated: 'تم تحديث السلة',
      cartCleared: 'تم إفراغ السلة',
      remove: 'إزالة',

      // Product Details
      addToCart: 'إضافة إلى السلة',
      buyNow: 'شراء الآن',
      productDetails: 'تفاصيل المنتج',
      category: 'الفئة',
      rating: 'التقييم',
      reviews: 'تقييمات',
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      description: 'الوصف',

      // Checkout
      checkout: 'الدفع',
      shippingInformation: 'معلومات الشحن',
      paymentInformation: 'معلومات الدفع',
      orderSummary: 'ملخص الطلب',
      completeOrder: 'إتمام الطلب',
      processing: 'جاري المعالجة...',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      city: 'المدينة',
      state: 'الولاية',
      zipCode: 'الرمز البريدي',
      cardNumber: 'رقم البطاقة',
      expiryDate: 'تاريخ الانتهاء',
      cvv: 'CVV',
      nameOnCard: 'الاسم على البطاقة',

      // Order Confirmation
      orderConfirmed: 'تم تأكيد الطلب!',
      thankYou: 'شكراً لك على الشراء. تم وضع طلبك بنجاح.',
      orderDetails: 'تفاصيل الطلب',
      placedOn: 'تم الطلب في',
      at: 'في',
      confirmed: 'مؤكد',
      orderItems: 'عناصر الطلب',
      quantity: 'الكمية',
      printReceipt: 'طباعة الفاتورة',

      // Auth
      welcomeBack: 'مرحباً بعودتك',
      createAccount: 'إنشاء حساب',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      dontHaveAccount: 'ليس لديك حساب؟',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      forgotPassword: 'نسيت كلمة المرور؟',
      enterEmail: 'أدخل بريدك الإلكتروني',
      enterPassword: 'أدخل كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      enterName: 'أدخل اسمك',

      // Hero
      welcomeTo: 'مرحباً بك في',
      discoverAmazing: 'اكتشف منتجات رائعة بأسعار مذهلة',

      // Theme
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع المظلم',
      language: 'English'
    }
  };

  const t = (key) => translations[language][key] || key;

  const value = {
    language,
    toggleLanguage,
    t,
    isRTL: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};