// src/pages/CartPage.tsx
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import styles from "../styles/Cart.module.css"; // We'll use the same CSS for now, or create Cart.module.css

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const { user } = useUser();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleIncrement = (productId: number, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: number, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <h2>Your Cart is Empty 🛒</h2>
        <p>Looks like you haven't added any items yet.</p>
        <Link to="/products" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>

      {/* Cart Summary */}
      <div className={styles.cartSummary}>
        <div className={styles.summaryItem}>
          <span>Items in Cart:</span>
          <span className={styles.summaryValue}>{getTotalItems()}</span>
        </div>
        <div className={styles.summaryItem}>
          <span>Total Price:</span>
          <span className={styles.summaryValue}>
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <div className={styles.userInfo}>
          <span>Shipping to:</span>
          <span className={styles.userAddress}>
            {user?.name} - {user?.address}
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.product.image} alt={item.product.title} />
            </div>

            <div className={styles.itemDetails}>
              <h3 className={styles.itemTitle}>{item.product.title}</h3>
              <p className={styles.itemCategory}>
                Category: {item.product.category}
              </p>
              <div className={styles.itemRating}>
                ⭐ {item.product.rating.rate} ({item.product.rating.count}{" "}
                reviews)
              </div>
              <p className={styles.itemPrice}>
                ${item.product.price.toFixed(2)} each
              </p>
            </div>

            <div className={styles.quantityControls}>
              <button
                onClick={() => handleDecrement(item.product.id, item.quantity)}
                className={styles.quantityBtn}
              >
                −
              </button>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    item.product.id,
                    parseInt(e.target.value) || 1
                  )
                }
                className={styles.quantityInput}
              />

              <button
                onClick={() => handleIncrement(item.product.id, item.quantity)}
                className={styles.quantityBtn}
              >
                +
              </button>
            </div>

            <div className={styles.itemTotal}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className={styles.removeBtn}
              aria-label="Remove item"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Cart Actions */}
      <div className={styles.cartActions}>
        <Link to="/products" className={styles.continueBtn}>
          ← Continue Shopping
        </Link>

        <div className={styles.rightActions}>
          <button onClick={clearCart} className={styles.clearBtn}>
            Clear Cart
          </button>

          <Link to="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout (${getTotalPrice().toFixed(2)})
          </Link>
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <div className={styles.summaryRow}>
          <span>Subtotal ({getTotalItems()} items):</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Estimated Shipping:</span>
          <span>$5.99</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Estimated Tax:</span>
          <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow + " " + styles.totalRow}>
          <span>Order Total:</span>
          <span>
            ${(getTotalPrice() + 5.99 + getTotalPrice() * 0.08).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
