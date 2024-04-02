import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const { user } = useAuth();

  const [cart, refetch] = useCart();

  // Scroll to the top of the page when user click
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  //Handling Scroll Functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    refetch();

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  // Check user is login
  const checkLogin = () => {
    if (!user) {
      toast.error("You need to Login for access Cart!");
    }
  };

  const navItems = (
    <>
      <li>
        <Link to="/" className="text-green mx-1" onClick={handleClick}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/menu" className="mx-1" onClick={handleClick}>
          Menu
        </Link>
      </li>
      <li>
        <Link to="/special-dishes" className="mx-1" onClick={handleClick}>
          Offers
        </Link>
      </li>

      <li tabIndex={0}>
        <details>
          <summary className="mx-1">Explore</summary>
          <ul className="p-2">
            <li>
              <Link to="/services" onClick={handleClick}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/testimonials" onClick={handleClick}>
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={handleClick}>
                Contact Us
              </Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 z-50">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : null
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" onClick={handleClick}>
            <img src={logo} className="w-20 md:w-full" alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* DARK MODE */}
          <label className="swap swap-rotate md:mr-2">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              onClick={() => alert("Comming Soon😋!")}
            />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* Cart btn */}
          <Link to={user ? "/cart-page" : "/"} className="md:mr-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle  flex justify-center"
              onClick={{ checkLogin, handleClick }}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </div>
          </Link>

          {/* Login btn */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              className="btn bg-green rounded-full px-6 text-white flex items-center gap-2 outline-none"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
