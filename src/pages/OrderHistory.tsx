// src/pages/OrderHistory.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useUser } from '../hooks/useUser';
import { FaTruck, FaSyncAlt, FaBoxOpen, FaMoneyBillWave, FaStar, FaCheck, FaHourglassHalf } from 'react-icons/fa';
import styles from '../styles/OrderHistory.module.css';

export default function OrderHistory() {
  const { orders, loading, error, filter, setFilter, totalOrders, totalSpent } = useOrders();
  const { user } = useUser();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return styles.statusDelivered;
      case 'shipped': return styles.statusShipped;
      case 'processing': return styles.statusProcessing;
      case 'pending': return styles.statusPending;
      default: return styles.statusDefault;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <FaCheck/>;
      case 'shipped': return <FaTruck/>;
      case 'processing': return <FaSyncAlt/>;
      case 'pending': return <FaHourglassHalf/>;
      default: return <FaBoxOpen/>;
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Order History</h1>
        <p className={styles.subtitle}>
          Welcome back, <strong>{user?.name}</strong>! Here's your purchase history.
        </p>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsOverview}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FaBoxOpen/></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalOrders}</span>
            <span className={styles.statLabel}>Total Orders</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FaMoneyBillWave/></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>${totalSpent.toFixed(2)}</span>
            <span className={styles.statLabel}>Total Spent</span>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FaStar/></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {orders.filter(o => o.status === 'delivered').length}
            </span>
            <span className={styles.statLabel}>Delivered</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All Orders
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'pending' ? styles.active : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'processing' ? styles.active : ''}`}
          onClick={() => setFilter('processing')}
        >
          Processing
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'shipped' ? styles.active : ''}`}
          onClick={() => setFilter('shipped')}
        >
          Shipped
        </button>
        <button
          className={`${styles.filterTab} ${filter === 'delivered' ? styles.active : ''}`}
          onClick={() => setFilter('delivered')}
        >
          Delivered
        </button>
      </div>

      {/* Orders List */}
      <div className={styles.ordersList}>
        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
            <Link to="/products" className={styles.shopButton}>
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              {/* Order Header */}
              <div 
                className={styles.orderHeader}
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className={styles.orderInfo}>
                  <div className={styles.orderId}>
                    <span className={styles.infoLabel}>Order #:</span>
                    <strong>{order.id}</strong>
                  </div>
                  <div className={styles.orderDate}>
                    <span className={styles.infoLabel}>Placed on:</span>
                    {formatDate(order.orderDate)}
                  </div>
                  <div className={styles.orderTotal}>
                    <span className={styles.infoLabel}>Total:</span>
                    <span className={styles.totalAmount}>${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className={styles.orderStatus}>
                  <span className={`${styles.statusBadge} ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status.toUpperCase()}
                  </span>
                  <button className={styles.expandButton}>
                    {expandedOrder === order.id ? '▲' : '▼'}
                  </button>
                </div>
              </div>

              {/* Order Details (Collapsible) */}
              {expandedOrder === order.id && (
                <div className={styles.orderDetails}>
                  {/* Items */}
                  <div className={styles.detailSection}>
                    <h4>Items ({order.items.length})</h4>
                    <div className={styles.itemsList}>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.orderItem}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.title}
                            className={styles.itemImage}
                          />
                          <div className={styles.itemDetails}>
                            <h5>{item.product.title}</h5>
                            <p>Quantity: {item.quantity}</p>
                            <p className={styles.itemPrice}>
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className={styles.detailSection}>
                    <h4>Shipping Information</h4>
                    <div className={styles.shippingInfo}>
                      <p><strong>{order.shippingAddress.fullName}</strong></p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                      <p>📞 {order.shippingAddress.phone}</p>
                    </div>
                    <div className={styles.deliveryInfo}>
                      <p>
                        <span className={styles.infoLabel}>Estimated Delivery:</span>
                        {formatDate(order.estimatedDelivery)}
                      </p>
                      {order.trackingNumber && (
                        <p>
                          <span className={styles.infoLabel}>Tracking #:</span>
                          <code className={styles.trackingCode}>{order.trackingNumber}</code>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className={styles.detailSection}>
                    <h4>Payment Information</h4>
                    <div className={styles.paymentInfo}>
                      <p>
                        <span className={styles.infoLabel}>Method:</span>
                        {order.paymentMethod.type === 'credit' ? 'Credit Card' : 'PayPal'}
                      </p>
                      {order.paymentMethod.type === 'credit' ? (
                        <p>
                          <span className={styles.infoLabel}>Card:</span>
                          Ending in {order.paymentMethod.cardNumber?.slice(-4)}
                        </p>
                      ) : (
                        <p>
                          <span className={styles.infoLabel}>PayPal:</span>
                          {order.paymentMethod.paypalEmail}
                        </p>
                      )}
                      <p>
                        <span className={styles.infoLabel}>Amount Paid:</span>
                        <strong>${order.total.toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className={styles.orderActions}>
                    {order.status === 'pending' && (
                      <button className={styles.cancelButton}>
                        Cancel Order
                      </button>
                    )}
                    {order.trackingNumber && (
                      <button className={styles.trackButton}>
                        Track Package
                      </button>
                    )}
                    <button className={styles.reorderButton}>
                      Buy Again
                    </button>
                    <button className={styles.supportButton}>
                      Get Help
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Note */}
      <div className={styles.footerNote}>
        <p>
          Need help with an order? <Link to="/contact">Contact our support team</Link>
        </p>
        <p className={styles.returnPolicy}>
          <strong>Return Policy:</strong> Items can be returned within 30 days of delivery.
        </p>
      </div>
    </div>
  );
}