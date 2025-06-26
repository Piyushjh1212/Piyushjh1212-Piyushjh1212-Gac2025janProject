import { useState, useEffect } from "react";
import "../../Styles/CheckoutPage.css";
import { useLocation } from "react-router-dom";
function CheckoutPage() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) return <p>Product details not found.</p>;

  // const basePrice = parseFloat(product.price);
  // const taxRate = 0.18;
  // const taxAmount = +(basePrice * taxRate).toFixed(2);
  // const totalAmount = +(basePrice + taxAmount).toFixed(2);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save20") {
      setIsPromoApplied(true);
    }
  };

  const calculateTotal = () => {
    let total = product.NewPrice ?? product.price;
    if (isPromoApplied) total *= 0.8;
    return total.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const OrderResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/razorpay/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            productId: product._id, // ✅ send productId here
            PromoCode: promoCode,
          }),
        }
      );

      if (!OrderResponse.ok) throw new Error("Something went wrong");

      const data = await OrderResponse.json();
      if (!data.success) {
        alert(data.message);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Growall Coaching",
        description: "Course Purchase",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/api/v1/razorpay/verify-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("✅ Payment Verified & Order Completed!");
            } else {
              alert("❌ Payment verification failed: " + verifyData.message);
            }
          } catch (err) {
            console.error("Verification error", err);
            alert("Error verifying payment");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment initiation failed. Try again.");
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const scriptExists = document.querySelector(
      "script[src='https://checkout.razorpay.com/v1/checkout.js']"
    );
    if (!scriptExists) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    }
  }, []);

  const validPromoCodes = {
    GAC50OFF: 50,
    GROW10: 10,
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const discountPercent = validPromoCodes[code];
    if (discountPercent) {
      const discount = (product.NewPrice * discountPercent) / 100;
      const newTotal = product.NewPrice - discount;
      setTotalPrice(newTotal);
      setPromoSuccess(`Promo code applied: ${discountPercent}% off`);
    } else {
      setPromoSuccess("Invalid promo code");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>EduMaster</h1>
        <p>Complete your purchase</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-left">
          <div className="course-summary">
            <h2>Course Summary</h2>
            <div className="course-card">
              <img
                src={product.images[0]}
                alt={product.name}
                className="course-image"
              />
              <div className="course-details">
                <h3>{product.name}</h3>
                <div className="course-meta">
                  <span className="rating">⭐ 4.8</span>
                  <span className="students">(15,234 students)</span>
                </div>
                <div className="course-info">
                  <span>~ Duration not specified ~</span>
                  <span>~ Lessons not specified ~</span>
                </div>
              </div>
              <div className="course-pricing">
                <span className="original-price">₹{product.price}</span>
                <span className="discounted-price">₹{product.NewPrice}</span>
                <span className="discount-badge">
                  {" "}
                  {product.price && product.NewPrice
                    ? `${Math.ceil(
                        ((Number(product.price) - Number(product.NewPrice)) /
                          Number(product.price)) *
                          100
                      )}% off`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input full-width"
              />
            </div>

            <div className="form-section">
              <h3>Contact Number</h3>
              <input
                type="phpne"
                name="phone"
                placeholder="Phone Number"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-input full-width"
              />
            </div>

            <div className="form-section">
              <h3>Billing Information</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="form-input full-width"
              />
              <div className="form-row_2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="form-input-1"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  required
                  className="form-input-1"
                />
              </div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="form-input full-width"
              >
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </form>
        </div>

        <div className="checkout-right">
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="promo-code-section">
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button
                  type="button"
                  onClick={handlePromoCode}
                  className="promo-btn"
                  disabled={isPromoApplied}
                >
                  Apply
                </button>
              </div>
              {isPromoApplied && (
                <div className="promo-success">
                  ✅ Promo code applied! Additional 20% off
                </div>
              )}
            </div>

            <div className="summary-row">
              <span>Course price:</span>
              <span>₹{product.NewPrice}</span>
            </div>

            {isPromoApplied && (
              <div className="summary-row discount">
                <span>Promo discount (20%):</span>
                <span>-₹{(product.NewPrice * 0.2).toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>

            <button
              type="submit"
              className="complete-order-btn"
              onClick={handleSubmit}
            >
              Pay now
            </button>

            <div className="security-badges">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className="security-item">
                <span className="security-icon">💳</span>
                <span>Safe Payment</span>
              </div>
              <div className="security-item">
                <span className="security-icon">↩️</span>
                <span>30-day Refund</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
