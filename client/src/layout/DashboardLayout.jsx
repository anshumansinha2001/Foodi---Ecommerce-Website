import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { toast } from "react-toastify";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { isAdmin, isAdminError } = useAdmin();
  const { logOut } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.info("Logout Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {isAdminError ? (
        <div>Error: Failed to fetch admin status :(</div>
      ) : isAdmin ? (
        <>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col lg:items-center lg:justify-start">
              {/* Page content here */}
              <div className="flex p-2 items-center justify-between fixed top-0 left-0 right-0 z-10 bg-white lg:hidden">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  Admin Panel
                  <MdDashboardCustomize />
                </label>
                <button
                  className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white lg:hidden"
                  onClick={handleLogout}
                >
                  <FaRegUser /> Logout
                </button>
              </div>
              <div className="mt-14 md:mt-2 mx-4">
                <Outlet />
              </div>
            </div>
            <div className="drawer-side z-20">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-2 text-lg">
                {/* Sidebar content here */}
                <li>
                  <Link to="/dashboard" className="flex justify-start mb-3">
                    <img src={logo} alt="logo" className="w-20" />
                    <span className="badge badge-primary">admin</span>
                  </Link>
                </li>
                <hr />
                <li className="mt-3">
                  <Link to="/dashboard">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-bookings">
                    <FaShoppingBag /> Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-menu">
                    <FaPlusCircle />
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-items">
                    <FaEdit /> Manage Items
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/users">
                    <FaUser /> All Users
                  </Link>
                </li>
                <li className="mb-3 hidden lg:flex">
                  <button onClick={handleLogout}>
                    <CiLogout />
                    Logout
                  </button>
                </li>

                <hr />

                {/* shared nav links */}
                {sharedLinks}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-10 mt-10">
          <div role="alert" className="alert alert-warning w-96">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: Unauthorized Access!</span>
          </div>
          <img
            className="mask mask-squircle inline-block w-80"
            src="https://static.vecteezy.com/system/resources/thumbnails/008/568/878/small/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space-site-crash-on-technical-work-web-design-template-with-chatbot-mascot-cartoon-online-bot-assistance-failure-vector.jpg"
          />
          <p className="font-semibold">Oops! It seems you're not an Admin🥺.</p>
          <Link to="/">
            <button className="btn bg-green text-white mt-5">
              Back to Home
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
