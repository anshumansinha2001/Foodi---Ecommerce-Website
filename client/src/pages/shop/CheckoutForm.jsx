import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  // Handle Payment Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create Card Element
    if (!stripe || !elements || !clientSecret) {
      console.log("Maybe clientSecret isn't there");
      return;
    }

    // create Card
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log("Card element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log("[PaymentIntent]", paymentIntent);

    if (confirmError.payment_intent) {
      // console.log(confirmError.payment_intent.id);
      setCardError(`Your transactionId is ${confirmError.payment_intent.id}`);
      // Payment info Data
      const paymentInfo = {
        email: user.email,
        transactionId: confirmError.payment_intent.id,
        price: price,
        quantity: cart.length,
        status: "Order pending",
        statusColor: "text-red",
        itemImage: cart.map((item) => item.image),
        itemName: cart.map((item) => item.name),
        itemId: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };

      //Post paymentInfo to DB
      axiosSecure
        .post("/payments", paymentInfo)
        .then((res) => {
          // console.log(res.data);
          navigate("/order");
          toast.success("Transaction Completed Successfullu!");
        })
        .catch((err) => {
          toast.error("Something Wrong!");
        });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 items-start">
      {/* Left Side */}
      <div className="md:w-1/2 w-full space-y-5">
        <div>
          <h4 className="text-xl font-bold underline underline-offset-4">
            Order Summary
          </h4>
        </div>
        {/* items Table */}
        <div className="overflow-x-auto shadow rounded-md">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-green text-white text-center">
              <tr>
                <th>#</th>
                <th className="text-start">Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Map Cart Item */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="imgItem" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-start">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/3 w-full flex flex-col space-y-8 justify-center items-center  py-10">
        <div className="flex shadow-xl md:mx-6 rounded-md">
          <div className="w-44">
            <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Album"
              className="rounded-l-md h-full"
            />
          </div>
          <div className="card-body md:w-1/2">
            <h2 className="card-title">Billing Amount:</h2>
            <p className="font-semibold text-2xl">${price}</p>
            <div className="card-actions justify-end">
              <p>Number of Items: {cart.length}</p>
            </div>
          </div>
        </div>

        <div className="card w-full space-y-5 shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
          <h4 className="text-lg font-semibold">Process Your Payment</h4>
          <h4 className="text-lg font-medium">Credit/Debit Card</h4>
          {/* Stripe Form */}
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe}
              className="btn btn-sm mt-5 bg-indigo-600 w-full text-white"
            >
              <FaCreditCard />
              Pay
            </button>
          </form>

          {/* ERROR MSG */}
          {cardError ? (
            <p className="text-red text-xs italic">{cardError}</p>
          ) : null}

          {/* Paypal */}
          <div className="mt-5 text-center">
            <hr />
            <button type="submit" className="btn btn-sm mt-5 bg-red text-white">
              <FaPaypal />
              Pay with PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
