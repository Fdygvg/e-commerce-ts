// src/pages/ProductDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { generateReviewsForProduct } from '../data/reviewUtils';
import type { Product, Review } from '../types';
import styles from '../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) {
      navigate('/products');
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) throw new Error('Product not found');
        
        const data: Product = await response.json();
        setProduct(data);
        
        // Generate random reviews for this product
        const productReviews = generateReviewsForProduct(data.id, Math.floor(Math.random() * 6) + 3);
        setReviews(productReviews);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`${quantity} ${product.title} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      handleAddToCart();
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <h2>Product Not Found</h2>
        <p>{error || "The product you're looking for doesn't exist."}</p>
        <Link to="/products" className={styles.backButton}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

  // Create star display
  const renderStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link> &gt;
        <Link to="/products">Products</Link> &gt;
        <span>{product.category}</span> &gt;
        <span className={styles.currentProduct}>{product.title}</span>
      </nav>

      {/* Product Main Section */}
      <div className={styles.productMain}>
        {/* Product Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img 
              src={product.image} 
              alt={product.title}
              className={styles.productImage}
            />
          </div>
          <div className={styles.imageThumbnails}>
            {/* Fake multiple images (using same image with filters) */}
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
              >
                <img 
                  src={product.image} 
                  alt={`View ${index + 1}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.infoSection}>
          <div className={styles.categoryBadge}>
            {product.category.toUpperCase()}
          </div>
          
          <h1 className={styles.productTitle}>{product.title}</h1>
          
          <div className={styles.ratingOverview}>
            <div className={styles.stars}>
              {renderStars(parseFloat(averageRating))}
              <span className={styles.ratingText}>{averageRating}</span>
            </div>
            <span className={styles.reviewCount}>
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
            <span className={styles.productId}>ID: {product.id}</span>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.taxInfo}>+ applicable taxes</span>
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className={styles.quantitySelector}>
            <label htmlFor="quantity">Quantity:</label>
            <div className={styles.quantityControls}>
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className={styles.quantityBtn}
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className={styles.quantityInput}
              />
              <button 
                onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                disabled={quantity >= 10}
                className={styles.quantityBtn}
              >
                +
              </button>
            </div>
            <span className={styles.stockStatus}>In Stock ✓</span>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button 
              onClick={handleAddToCart}
              className={styles.addToCartBtn}
            >
              🛒 Add to Cart ({quantity})
            </button>
            
            <button 
              onClick={handleBuyNow}
              className={styles.buyNowBtn}
            >
              Buy Now
            </button>
            
            <button className={styles.wishlistBtn}>
              ♡ Add to Wishlist
            </button>
          </div>

          {/* Product Details */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Category:</span>
              <span className={styles.detailValue}>{product.category}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Free Shipping:</span>
              <span className={styles.detailValue}>Yes ✓</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Returns:</span>
              <span className={styles.detailValue}>30 Days</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Warranty:</span>
              <span className={styles.detailValue}>1 Year</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>
          Customer Reviews ({reviews.length})
          <span className={styles.averageRating}>
            Average Rating: {averageRating} ★
          </span>
        </h2>

        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <img 
                  src={review.userAvatar} 
                  alt={review.userName}
                  className={styles.reviewAvatar}
                />
                <div className={styles.reviewerInfo}>
                  <h4>{review.userName}</h4>
                  <div className={styles.reviewMeta}>
                    <span className={styles.reviewStars}>
                      {renderStars(review.rating)}
                    </span>
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                </div>
              </div>
              
              <p className={styles.reviewComment}>{review.comment}</p>
              
              <div className={styles.reviewFooter}>
                <button className={styles.helpfulBtn}>
                  👍 Helpful ({review.helpful})
                </button>
                <button className={styles.reportBtn}>
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Button */}
        <button className={styles.addReviewBtn}>
          ✍️ Write a Review
        </button>
      </div>

      {/* Related Products Link */}
      <div className={styles.relatedSection}>
        <h3>You Might Also Like</h3>
        <p>Check out similar products in the same category:</p>
        <Link 
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className={styles.viewRelated}
        >
          View All {product.category} →
        </Link>
      </div>
    </div>
  );
}