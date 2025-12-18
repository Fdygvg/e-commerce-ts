// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useCart } from '../hooks/useCart';
import { featuredProducts, bestSellers } from '../data/mockData';
import UserProfile from '../components/UserProfile';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { user } = useUser();
  const { getTotalItems } = useCart();

  return (
    <div className={styles.home}>

      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to E-Shop {user?.name}!</h1>
          <p className={styles.heroSubtitle}>
            Your one-stop destination for the latest tech gadgets and electronics
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{getTotalItems()}</span>
              <span className={styles.statLabel}>Items in Cart</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Support</span>
            </div>
          </div>
          <div className={styles.heroButtons}>
            <Link to="/products" className={styles.primaryButton}>
              Shop Now →
            </Link>
            <Link to="/cart" className={styles.secondaryButton}>
              View Cart ({getTotalItems()})
            </Link>
          </div>
        </div>
      </section>






      {/* User Profile Card */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Profile</h2>
        <UserProfile />
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <Link to="/products" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.title} className={styles.productImage} />
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>${product.price}</span>
                  <span className={styles.productRating}>
                    ⭐ {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
                <Link
                  to={`/products#${product.id}`}
                  className={styles.productButton}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Best Sellers</h2>
          <Link to="/products" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={styles.productsGrid}>
          {bestSellers.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.bestSellerBadge}>🔥 Best Seller</div>
              <img src={product.image} alt={product.title} className={styles.productImage} />
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>${product.price}</span>
                  <span className={styles.productRating}>
                    ⭐ {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
                <Link
                  to={`/products#${product.id}`}
                  className={styles.productButton}
                >
                  Quick View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Preview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Shopping Summary</h2>
        <div className={styles.summaryCard}>
          <p>You're currently logged in as <strong>{user?.name}</strong></p>
          <p>Cart items persist in local storage - try refreshing the page!</p>
          <p>Add items to cart and they'll stay even after closing browser.</p>
         
        </div>
      </section>
    </div>
  );
}