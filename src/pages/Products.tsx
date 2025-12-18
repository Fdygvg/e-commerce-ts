import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

import styles from '../styles/Products.module.css';

export default function ProductsPage() {
  const { 
    categories, 
    products, 
    selectedCategory, 
    loading, 
    error, 
    fetchProducts 
  } = useProducts();
  
  const { addToCart } = useCart();

  const handleCategoryClick = (category: string) => {
    fetchProducts(category);
  };

  const handleShowAll = () => {
    fetchProducts();
  };

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Products</h1>
      
      {/* Category Filter */}
      <div className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>Categories</h2>
        <div className={styles.categoryList}>
          <button
            onClick={handleShowAll}
            className={`${styles.categoryButton} ${
              selectedCategory === null ? styles.active : ''
            }`}
          >
            All Products
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>
          {selectedCategory 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
            : 'All Products'
          }
          <span className={styles.productCount}> ({products.length} items)</span>
        </h2>
        
        {loading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
<Link to={`/products/${product.id}`} className={styles.productCard}>                <div className={styles.imageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className={styles.productImage}
                  />
                </div>
                
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  
                  <div className={styles.rating}>
                    ⭐ {product.rating.rate} 
                    <span className={styles.ratingCount}>({product.rating.count})</span>
                  </div>
                  
                  <p className={styles.productDescription}>
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description
                    }
                  </p>
                  
                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className={styles.addToCartButton}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}