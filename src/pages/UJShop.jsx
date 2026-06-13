import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#dc2626' : 'none'} stroke={filled ? '#dc2626' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const FireIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF6B00" stroke="#FF6B00" strokeWidth="1">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.5 0-6 .08-.55-.5-1-1-1-2 0-5 2.5-5 7 0 3.5 2.5 6 5 6 .83 0 1.5-.67 1.5-1.5z"/>
  </svg>
);

const PercentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const UJShop = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('ujconnect_user') || '{}');
  const [user, setUser] = useState(storedUser);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchUserProfile();
    const onStorage = () => {
      const saved = localStorage.getItem('ujconnect_dark_mode');
      if (saved !== null) setDarkMode(saved === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/users/${storedUser.id}`);
      setUser(data);
      localStorage.setItem('ujconnect_user', JSON.stringify(data));
      // Load dark mode from DB
      const dbDarkMode = data.dark_mode;
      if (dbDarkMode !== null && dbDarkMode !== undefined) {
        const isDark = dbDarkMode === 'true' || dbDarkMode === true;
        setDarkMode(isDark);
        localStorage.setItem('ujconnect_dark_mode', isDark ? 'true' : 'false');
      }
    } catch (err) {
      // Fallback to localStorage
      const saved = localStorage.getItem('ujconnect_dark_mode');
      setDarkMode(saved !== null ? saved === 'true' : true);
    }
  };

  const theme = {
    bg: darkMode ? '#000' : '#fff',
    text: darkMode ? '#fff' : '#1a1a1a',
    textSecondary: darkMode ? '#aaa' : '#888',
    border: darkMode ? '#222' : '#eee',
    cardBg: darkMode ? '#111' : '#fff',
    saleRed: '#dc2626',
    accent: '#FF6B00',
  };

  const categories = ['All', 'Clothing', 'Hair & Beauty', 'Photography', 'Furniture', 'Electronics', 'Food', 'Services', 'Grad Gear'];

  const products = [
    // FOOD
    { id: 1, name: 'Homemade Brownies (12pk)', price: 60, originalPrice: null, rating: 5.0, reviews: 43, seller: 'BakeByKarabo', sellerDept: 'Hospitality', location: 'DFC Campus', category: 'Food', images: ['/BK.jpg', '/Bb.jpg'], tag: 'Yum!', sold: 534 },
    { id: 2, name: 'Burger & Chips Combo', price: 45, originalPrice: 70, rating: 4.7, reviews: 28, seller: 'Campus Eats', sellerDept: 'Hospitality', location: 'APK Campus', category: 'Food', images: ['/Bb.jpg', '/BK.jpg'], tag: 'Hot', sold: 189 },

    // HAIR & BEAUTY
    { id: 3, name: 'Box Braids Installation', price: 350, originalPrice: 500, rating: 4.8, reviews: 124, seller: 'Amahle Styles', sellerDept: 'Hospitality', location: 'APK Campus', category: 'Hair & Beauty', images: ['/HA1.jpg', '/HA2.jpg'], tag: 'Hot', sold: 89 },
    { id: 4, name: 'Knotless Braids', price: 280, originalPrice: 400, rating: 4.9, reviews: 87, seller: 'Lerato Beauty', sellerDept: 'Marketing', location: 'DFC Campus', category: 'Hair & Beauty', images: ['/A.jpg', '/HA1.jpg'], tag: 'Trending', sold: 156 },
    { id: 5, name: 'Goddess Braids', price: 400, originalPrice: 550, rating: 4.6, reviews: 56, seller: 'Amahle Styles', sellerDept: 'Hospitality', location: 'APK Campus', category: 'Hair & Beauty', images: ['/HA2.jpg', '/A.jpg'], tag: 'Trending', sold: 72 },

    // PHOTOGRAPHY
    { id: 6, name: 'Graduation Photoshoot', price: 450, originalPrice: 600, rating: 4.7, reviews: 53, seller: 'Sipho Captures', sellerDept: 'Applied Information Systems', location: 'APK Campus', category: 'Photography', images: ['/GA.jpg', '/G1.jpg'], tag: 'Grad Season', sold: 42 },
    { id: 7, name: 'Portrait Session (1hr)', price: 200, originalPrice: 300, rating: 4.6, reviews: 38, seller: 'Neo Visuals', sellerDept: 'Law', location: 'SWC Campus', category: 'Photography', images: ['/G1.jpg', '/GA.jpg'], tag: null, sold: 67 },

    // CLOTHING
    { id: 8, name: 'Vintage Denim Jacket', price: 180, originalPrice: 350, rating: 4.5, reviews: 92, seller: 'ThriftByThabo', sellerDept: 'Finance & Investment Management', location: 'APK Campus', category: 'Clothing', images: ['/HA1.jpg', '/HA2.jpg'], tag: '50% OFF', sold: 203 },
    { id: 9, name: 'UJ Hoodie Custom', price: 320, originalPrice: 450, rating: 4.8, reviews: 210, seller: 'Campus Merch Co', sellerDept: 'Business Management', location: 'DFC Campus', category: 'Clothing', images: ['/A.jpg', '/HA1.jpg'], tag: 'Best Seller', sold: 340 },

    // GRAD GEAR
    { id: 21, name: 'Graduation Gown (Black)', price: 350, originalPrice: 500, rating: 4.8, reviews: 67, seller: 'GradGear SA', sellerDept: 'Business Management', location: 'APK Campus', category: 'Grad Gear', images: ['/G1.jpg', '/GA.jpg'], tag: 'Grad Season', sold: 234 },
    { id: 22, name: 'Graduation Gown (Blue)', price: 400, originalPrice: 550, rating: 4.7, reviews: 45, seller: 'GradGear SA', sellerDept: 'Business Management', location: 'APK Campus', category: 'Grad Gear', images: ['/GA.jpg', '/G1.jpg'], tag: 'New', sold: 178 },
    { id: 23, name: 'Grad Cap & Gown Set', price: 500, originalPrice: 700, rating: 4.9, reviews: 89, seller: 'GradGear SA', sellerDept: 'Business Management', location: 'DFC Campus', category: 'Grad Gear', images: ['/G1.jpg', '/GA.jpg'], tag: 'Best Seller', sold: 312 },

    // FURNITURE
    { id: 10, name: 'Comfy Couch (3-Seater)', price: 1800, originalPrice: 2500, rating: 4.3, reviews: 15, seller: 'Res Furniture', sellerDept: 'Industrial Psychology', location: 'APK Campus', category: 'Furniture', images: ['/FC1.jpg', '/FC2.jpg'], tag: null, sold: 8 },
    { id: 11, name: 'Wall Mirror (Full Length)', price: 350, originalPrice: 500, rating: 4.5, reviews: 22, seller: 'Res Furniture', sellerDept: 'Industrial Psychology', location: 'APK Campus', category: 'Furniture', images: ['/M1.jpg', '/M2.jpg'], tag: 'New', sold: 34 },
    { id: 12, name: 'Microwave (Used - Good)', price: 400, originalPrice: 700, rating: 4.1, reviews: 18, seller: 'Res Furniture', sellerDept: 'Industrial Psychology', location: 'DFC Campus', category: 'Furniture', images: ['/M2.jpg', '/M1.jpg'], tag: null, sold: 12 },
    { id: 13, name: 'Study Desk & Chair', price: 850, originalPrice: 1200, rating: 4.4, reviews: 27, seller: 'Res Furniture', sellerDept: 'Industrial Psychology', location: 'APK Campus', category: 'Furniture', images: ['/H1.jpg', '/H2.jpg'], tag: 'Best Seller', sold: 15 },
    { id: 14, name: 'Bookshelf (3-Tier)', price: 450, originalPrice: null, rating: 4.2, reviews: 19, seller: 'Res Furniture', sellerDept: 'Industrial Psychology', location: 'APK Campus', category: 'Furniture', images: ['/H2.jpg', '/H3.jpg'], tag: 'New', sold: 23 },
    { id: 15, name: 'Office Chair (Ergonomic)', price: 600, originalPrice: 900, rating: 4.6, reviews: 31, seller: 'Res Furniture', sellerDept: 'Industrial Psychology', location: 'SWC Campus', category: 'Furniture', images: ['/H3.jpg', '/H1.jpg'], tag: null, sold: 19 },

    // ELECTRONICS
    { id: 16, name: 'Wireless Earbuds', price: 250, originalPrice: 400, rating: 4.6, reviews: 145, seller: 'TechGuySipho', sellerDept: 'Applied Information Systems', location: 'DFC Campus', category: 'Electronics', images: ['/FC1.jpg', '/FC2.jpg'], tag: 'Flash Sale', sold: 289 },
    { id: 17, name: 'Phone Charger Pack', price: 80, originalPrice: 150, rating: 4.3, reviews: 67, seller: 'TechGuySipho', sellerDept: 'Applied Information Systems', location: 'DFC Campus', category: 'Electronics', images: ['/FC2.jpg', '/FC1.jpg'], tag: null, sold: 412 },

    // SERVICES
    { id: 18, name: 'Phone Repairs', price: 150, originalPrice: 250, rating: 4.9, reviews: 312, seller: 'FixItFelix', sellerDept: 'Engineering', location: 'APK Campus', category: 'Services', images: ['/M1.jpg', '/M2.jpg'], tag: 'Top Rated', sold: 456 },
    { id: 19, name: 'Tutoring (per hour)', price: 80, originalPrice: 120, rating: 4.7, reviews: 89, seller: 'StudyBuddyZA', sellerDept: 'Economics and Econometrics', location: 'SWC Campus', category: 'Services', images: ['/H1.jpg', '/H3.jpg'], tag: null, sold: 178 },
    { id: 20, name: 'Assignment Proofreading', price: 50, originalPrice: null, rating: 4.8, reviews: 156, seller: 'StudyBuddyZA', sellerDept: 'Economics and Econometrics', location: 'SWC Campus', category: 'Services', images: ['/H2.jpg', '/H1.jpg'], tag: null, sold: 234 },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const searchedProducts = searchQuery.trim() 
    ? filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    setCartCount(prev => prev + 1);
    setSelectedProduct(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0a0a0a' : '#f5f5f5', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', maxWidth: 600, margin: '0 auto', position: 'relative', paddingBottom: '20px' }}>

      {/* HEADER */}
      <div style={{ padding: '12px 16px', background: theme.bg, position: 'sticky', top: 0, zIndex: 100, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, padding: '4px', display: 'flex' }}>
            <ArrowLeftIcon />
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: darkMode ? '#1a1a1a' : '#f5f5f5', borderRadius: 24, padding: '10px 16px', gap: 8 }}>
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Search UJ Shop..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontFamily: 'inherit', color: theme.text }}
            />
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.text, position: 'relative', padding: 4 }}>
            <CartIcon />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, background: '#dc2626', color: 'white', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Flash Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #dc2626, #FF6B00)', 
          borderRadius: 10, 
          padding: '10px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Flash Sale</div>
              <div style={{ fontSize: 11, opacity: 0.9 }}>Up to 60% off • Ends in 2h</div>
            </div>
          </div>
          <button style={{ background: 'white', color: '#dc2626', border: 'none', padding: '6px 14px', borderRadius: 20, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: '12px 16px', background: theme.bg, borderBottom: `1px solid ${theme.border}`, display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: activeCategory === cat ? 'none' : `1.5px solid ${theme.border}`,
              background: activeCategory === cat ? '#FF6B00' : 'transparent',
              color: activeCategory === cat ? 'white' : theme.textSecondary,
              fontSize: 13,
              fontWeight: activeCategory === cat ? 600 : 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DEALS ROW */}
      <div style={{ padding: '16px', background: theme.bg, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <FireIcon />
          <span style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>Hot Deals</span>
          <PercentIcon />
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {products.filter(p => p.tag).slice(0, 6).map(product => (
            <div 
              key={product.id} 
              onClick={() => { setSelectedProduct(product); setSelectedImageIndex(0); }}
              style={{ 
                flexShrink: 0, width: 150, borderRadius: 12, overflow: 'hidden', 
                background: theme.cardBg, border: `1px solid ${theme.border}`, cursor: 'pointer' 
              }}
            >
              <div style={{ position: 'relative', height: 130, background: darkMode ? '#1a1a1a' : '#f0f0f0' }}>
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                {product.tag && (
                  <span style={{ position: 'absolute', top: 6, left: 6, background: '#dc2626', color: 'white', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 700 }}>
                    {product.tag}
                  </span>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <HeartIcon filled={wishlist.includes(product.id)} />
                </button>
                {product.originalPrice && (
                  <span style={{ position: 'absolute', bottom: 6, left: 6, background: '#dc2626', color: 'white', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.text, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#dc2626' }}>R{product.price}</span>
                  {product.originalPrice && (
                    <span style={{ fontSize: 11, color: '#aaa', textDecoration: 'line-through' }}>R{product.originalPrice}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                  <StarIcon />
                  <span style={{ fontSize: 10, color: '#888' }}>{product.rating} ({product.sold} sold)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: '12px 16px', marginTop: 8, background: theme.bg }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 12 }}>
          {activeCategory === 'All' ? 'All Products' : activeCategory}
        </div>
        
        {searchedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: theme.textSecondary }}>
            No products found
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {searchedProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => { setSelectedProduct(product); setSelectedImageIndex(0); }}
                style={{ 
                  borderRadius: 12, overflow: 'hidden', background: theme.cardBg,
                  border: `1px solid ${theme.border}`, cursor: 'pointer'
                }}
              >
                <div style={{ position: 'relative', height: 160, background: darkMode ? '#1a1a1a' : '#f0f0f0' }}>
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  {product.tag && (
                    <span style={{ position: 'absolute', top: 6, left: 6, background: product.tag.includes('%') || product.tag.includes('Sale') ? '#dc2626' : '#FF6B00', color: 'white', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 700 }}>
                      {product.tag}
                    </span>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <HeartIcon filled={wishlist.includes(product.id)} />
                  </button>
                </div>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LocationIcon /> {product.location}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#dc2626' }}>R{product.price}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: 11, color: '#aaa', textDecoration: 'line-through' }}>R{product.originalPrice}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <StarIcon />
                    <span style={{ fontSize: 10, color: '#888' }}>{product.rating} ({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: theme.bg, zIndex: 5000, overflowY: 'auto' }}>
          <div style={{ position: 'relative', height: 350, background: darkMode ? '#1a1a1a' : '#f0f0f0' }}>
            <img src={selectedProduct.images[selectedImageIndex]} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
              <ArrowLeftIcon />
            </button>
            <button onClick={() => toggleWishlist(selectedProduct.id)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <HeartIcon filled={wishlist.includes(selectedProduct.id)} />
            </button>
            
            <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {selectedProduct.images.map((_, i) => (
                <button key={i} onClick={() => setSelectedImageIndex(i)} style={{ width: 8, height: 8, borderRadius: '50%', background: i === selectedImageIndex ? 'white' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: 0 }} />
              ))}
            </div>
          </div>

          <div style={{ padding: '20px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.text, margin: '0 0 6px' }}>{selectedProduct.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  </div>
                  <span style={{ fontSize: 13, color: '#888' }}>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16, padding: '16px', background: darkMode ? '#111' : '#fff7ed', borderRadius: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#dc2626' }}>R{selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span style={{ fontSize: 16, color: '#aaa', textDecoration: 'line-through' }}>R{selectedProduct.originalPrice}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#dc2626', background: '#fee2e2', padding: '2px 8px', borderRadius: 10 }}>
                    -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '12px', background: theme.cardBg, borderRadius: 12, border: `1px solid ${theme.border}` }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18 }}>
                {selectedProduct.seller.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{selectedProduct.seller}</div>
                <div style={{ fontSize: 11, color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <LocationIcon /> {selectedProduct.location} • {selectedProduct.sellerDept}
                </div>
              </div>
              <button style={{ background: 'none', border: `1.5px solid ${theme.border}`, padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: theme.textSecondary, cursor: 'pointer', fontFamily: 'inherit' }}>
                View Shop
              </button>
            </div>

            {['Clothing', 'Hair & Beauty', 'Grad Gear'].includes(selectedProduct.category) && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 8 }}>Select Option</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Small', 'Medium', 'Large', 'XL', 'Custom'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 8,
                        border: selectedSize === size ? '2px solid #FF6B00' : `1.5px solid ${theme.border}`,
                        background: selectedSize === size ? '#FFF7ED' : 'transparent',
                        color: selectedSize === size ? '#FF6B00' : theme.textSecondary,
                        fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                <span style={{ fontSize: 16, fontWeight: 600, color: theme.text, minWidth: 20, textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#dc2626', fontWeight: 600, marginBottom: 16 }}>
              🔥 {selectedProduct.sold} sold • {selectedProduct.sold > 100 ? 'Selling fast!' : 'Limited stock'}
            </div>

            <button 
              onClick={() => addToCart(selectedProduct.id)}
              style={{
                width: '100%', padding: '16px', background: '#FF6B00', color: 'white', border: 'none',
                borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
              }}
            >
              Add to Cart • R{selectedProduct.price * quantity}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default UJShop;