// src/pages/Checkout.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
import type { Address, PaymentMethod } from "../types";
import { FaPaypal } from "react-icons/fa";
import styles from "../styles/Checkout.module.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useUser();

  const [step, setStep] = useState<"address" | "payment" | "review">("address");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Address Form State
  const [address, setAddress] = useState<Address>({
    fullName: user?.name || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  // Payment Form State
  const [payment, setPayment] = useState<PaymentMethod>({
    type: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [saveAddress, setSaveAddress] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");

  // Calculate totals
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Form Validation
  const validateAddress = () => {
    const required = [
      "fullName",
      "street",
      "city",
      "state",
      "zipCode",
      "phone",
    ];
    return required.every((field) => address[field as keyof Address]?.trim());
  };

  const validatePayment = () => {
    if (payment.type === "paypal") {
      return payment.paypalEmail?.includes("@");
    }
    return (
      payment.cardNumber?.length === 16 &&
      payment.expiryDate?.length === 5 &&
      payment.cvv?.length === 3
    );
  };

  // Handlers
  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === "address" && validateAddress()) {
      setStep("payment");
    } else if (step === "payment" && validatePayment()) {
      setStep("review");
    }
  };

  const handlePrevStep = () => {
    if (step === "payment") setStep("address");
    if (step === "review") setStep("payment");
  };

  const simulateOrderPlacement = () => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress() || !validatePayment()) {
      alert("Please complete all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await simulateOrderPlacement();

      // Generate order number
      const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
      setOrderNumber(newOrderNumber);

      // Clear cart
      clearCart();

      // Show success
      setOrderPlaced(true);

      // Save to localStorage (optional)
      const order = {
        id: newOrderNumber,
        date: new Date().toISOString(),
        total,
        address,
        items,
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
    } catch (error) {
      console.error(error);
      alert("Order failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart before checkout.</p>
        <button
          onClick={() => navigate("/products")}
          className={styles.shopButton}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h1>Order Confirmed!</h1>
          <p className={styles.orderNumber}>Order #: {orderNumber}</p>

          <div className={styles.successDetails}>
            <div className={styles.detailItem}>
              <span>Order Total:</span>
              <span className={styles.totalAmount}>${total.toFixed(2)}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Shipping to:</span>
              <span>
                {address.fullName}, {address.city}, {address.state}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span>Estimated Delivery:</span>
              <span>3-5 business days</span>
            </div>
          </div>

          <div className={styles.successActions}>
            <button
              onClick={() => navigate("/products")}
              className={styles.continueShopping}
            >
              Continue Shopping
            </button>
            <button onClick={() => navigate("/")} className={styles.viewOrders}>
              View Order Details
            </button>
          </div>

          <p className={styles.emailNote}>
            A confirmation email has been sent to {user?.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Progress Steps */}
      <div className={styles.progressSteps}>
        <div
          className={`${styles.step} ${
            step === "address" ? styles.active : ""
          }`}
        >
          <div className={styles.stepNumber}>1</div>
          <span>Shipping Address</span>
        </div>
        <div className={styles.stepLine}></div>
        <div
          className={`${styles.step} ${
            step === "payment" ? styles.active : ""
          }`}
        >
          <div className={styles.stepNumber}>2</div>
          <span>Payment Method</span>
        </div>
        <div className={styles.stepLine}></div>
        <div
          className={`${styles.step} ${step === "review" ? styles.active : ""}`}
        >
          <div className={styles.stepNumber}>3</div>
          <span>Review & Place Order</span>
        </div>
      </div>

      <div className={styles.checkoutContent}>
        {/* Left Column: Forms */}
        <div className={styles.formsColumn}>
          {/* Address Form */}
          {step === "address" && (
            <div className={styles.formSection}>
              <h2>Shipping Address</h2>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={address.fullName}
                    onChange={(e) =>
                      handleAddressChange("fullName", e.target.value)
                    }
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="street">Street Address *</label>
                  <input
                    id="street"
                    type="text"
                    value={address.street}
                    onChange={(e) =>
                      handleAddressChange("street", e.target.value)
                    }
                    placeholder="123 Main St"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    placeholder="New York"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="state">State *</label>
                  <input
                    id="state"
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    placeholder="NY"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    id="zipCode"
                    type="text"
                    value={address.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                    placeholder="10001"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    value={address.country}
                    onChange={(e) =>
                      handleAddressChange("country", e.target.value)
                    }
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={address.phone}
                    onChange={(e) =>
                      handleAddressChange("phone", e.target.value)
                    }
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  Save this address for future orders
                </label>
              </div>
            </div>
          )}

          {/* Payment Form */}
          {step === "payment" && (
            <div className={styles.formSection}>
              <h2>Payment Method</h2>

              <div className={styles.paymentTabs}>
                <button
                  className={`${styles.paymentTab} ${
                    payment.type === "credit" ? styles.active : ""
                  }`}
                  onClick={() => setPayment({ ...payment, type: "credit" })}
                >
                  💳 Credit/Debit Card
                </button>
                <button
                  className={`${styles.paymentTab} ${
                    payment.type === "paypal" ? styles.active : ""
                  }`}
                  onClick={() => setPayment({ ...payment, type: "paypal" })}
                >
                  <FaPaypal /> PayPal
                </button>
              </div>

              {payment.type === "credit" ? (
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      id="cardNumber"
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) =>
                        handlePaymentChange(
                          "cardNumber",
                          e.target.value.replace(/\D/g, "").slice(0, 16)
                        )
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
                    <input
                      id="expiryDate"
                      type="text"
                      value={payment.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        handlePaymentChange("expiryDate", value);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      id="cvv"
                      type="password"
                      value={payment.cvv}
                      onChange={(e) =>
                        handlePaymentChange(
                          "cvv",
                          e.target.value.replace(/\D/g, "").slice(0, 3)
                        )
                      }
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label htmlFor="paypalEmail">PayPal Email *</label>
                  <input
                    id="paypalEmail"
                    type="email"
                    value={payment.paypalEmail}
                    onChange={(e) =>
                      handlePaymentChange("paypalEmail", e.target.value)
                    }
                    placeholder="paypal@example.com"
                    required
                  />
                  <p className={styles.paypalNote}>
                    You will be redirected to PayPal to complete your payment
                  </p>
                </div>
              )}

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  />
                  Billing address same as shipping
                </label>
              </div>
            </div>
          )}

          {/* Review Step */}
          {step === "review" && (
            <div className={styles.formSection}>
              <h2>Review Your Order</h2>

              <div className={styles.reviewSection}>
                <h3>Shipping Address</h3>
                <div className={styles.reviewDetails}>
                  <p>{address.fullName}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                  <p>📞 {address.phone}</p>
                </div>
                <button
                  onClick={() => setStep("address")}
                  className={styles.editButton}
                >
                  Edit
                </button>
              </div>

              <div className={styles.reviewSection}>
                <h3>Payment Method</h3>
                <div className={styles.reviewDetails}>
                  {payment.type === "credit" ? (
                    <>
                      <p>
                        💳 Credit Card ending in {payment.cardNumber?.slice(-4)}
                      </p>
                      <p>Expires: {payment.expiryDate}</p>
                    </>
                  ) : (
                    <p>
                      <FaPaypal />
                      PayPal: {payment.paypalEmail}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setStep("payment")}
                  className={styles.editButton}
                >
                  Edit
                </button>
              </div>

              <div className={styles.reviewSection}>
                <h3>Gift Options</h3>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a gift message (optional)"
                  className={styles.giftTextarea}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="promoCode">Promo Code (Optional)</label>
                <div className={styles.promoInput}>
                  <input
                    id="promoCode"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                  />
                  <button className={styles.applyButton}>Apply</button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.navigationButtons}>
            {step !== "address" && (
              <button onClick={handlePrevStep} className={styles.backButton}>
                ← Back
              </button>
            )}

            {step !== "review" ? (
              <button
                onClick={handleNextStep}
                className={styles.nextButton}
                disabled={
                  (step === "address" && !validateAddress()) ||
                  (step === "payment" && !validatePayment())
                }
              >
                Continue to {step === "address" ? "Payment" : "Review"} →
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className={styles.placeOrderButton}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className={styles.spinner}></span>
                    Processing...
                  </>
                ) : (
                  `Place Order • $${total.toFixed(2)}`
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.summaryColumn}>
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>

            <div className={styles.itemsList}>
              <h3>Items ({items.length})</h3>
              {items.map((item) => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h4>{item.product.title}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Shipping</span>
                <span className={shipping === 0 ? styles.freeShipping : ""}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className={styles.priceRow}>
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {promoCode && (
                <div className={styles.priceRow}>
                  <span>Promo Code: {promoCode}</span>
                  <span className={styles.discount}>-$5.00</span>
                </div>
              )}

              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalAmount}>${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 50 && (
              <div className={styles.freeShippingNote}>
                🚚 Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
              </div>
            )}

            <div className={styles.securityBadges}>
              <div className={styles.badge}>🔒 Secure Checkout</div>
              <div className={styles.badge}>💳 SSL Encrypted</div>
            </div>

            <div className={styles.returnPolicy}>
              <h4>Return Policy</h4>
              <p>30-day return policy. Items must be in original condition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
