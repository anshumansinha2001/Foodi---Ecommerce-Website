import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

const DisplayItem = () => {
  const item = useLoaderData();
  // console.log(item);

  const API = import.meta.env.VITE_APP_URI_API;
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const [cart, refetch] = useCart();

  const [itemAdded, setItemAdded] = useState(false);

  const { _id, name, recipe, image, price } = item;

  //Add to cart Handler btn
  const handleAddToCart = (item) => {
    // console.log(item);
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      axiosSecure
        .post(`${API}/cart`, cartItem)
        .then((response) => {
          if (response) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Added To Cart!",
              text: "Your item is waiting to checkout...",
              showConfirmButton: false,
              timer: 1500,
            });
            setItemAdded(true);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "It seems you haven't logged in yet. You need to login for adding items to cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="section-container">
      <div className="hero bg-base-200 shadow-2xl rounded-xl md:py-16 mt-24">
        <div className="hero-content flex-col lg:flex-row justify-between">
          <div className="md:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-green">
              {item.name}
            </h1>
            <hr className="mt-4" />
            <p className="py-6 text-start">{item.recipe}</p>
          </div>

          {/* FORM SECTION */}
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <img src={item.image} alt="item" className="rounded-l-md h-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-28 md:h-auto items-center justify-between my-14 md:my-8">
        <div className="font-semibold text-2xl">
          Price: <span className="text-4xl text-green">${item.price}</span>{" "}
          <span className="text-sm  line-through">${item.price + 85}</span>
        </div>

        {itemAdded ? (
          <Link to="/process-checkout">
            <button className="btn md:btn-lg btn-wide bg-red text-white">
              Procceed to Checkout
            </button>
          </Link>
        ) : (
          <button
            className="btn md:btn-lg btn-wide bg-green text-white"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayItem;
