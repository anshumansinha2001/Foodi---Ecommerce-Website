import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
  const [cart] = useCart();

  // Calculate the Total Price for each item in the cart
  const calculateTotalPriceForEachItem = (item) => {
    return item.price * item.quantity;
  };

  // Calculate the cart Overall Price for Billing
  const calculateOverallPrice = cart.reduce((total, item) => {
    return total + calculateTotalPriceForEachItem(item);
  }, 0);

  const BillingPrice = parseFloat(calculateOverallPrice).toFixed(2);
  return (
    <div className="section-container py-20 md:py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={BillingPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
