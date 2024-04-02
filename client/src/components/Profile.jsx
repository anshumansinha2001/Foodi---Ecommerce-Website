import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings, MdOutlineSupportAgent } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);

  // Scroll to the top of the page when user click
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  //Logout User
  const handlelogout = () => {
    logOut()
      .then(() => {
        toast.info("Logout Successful!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              {user.displayName ? (
                <h3 className="font-semibold">{user.displayName}</h3>
              ) : (
                <div>
                  <h3 className="font-semibold">Welcome User!</h3>
                </div>
              )}
            </li>
            <li>
              <Link to="/update-profile" onClick={handleClick}>
                <CgProfile className="text-xl" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={handleClick}>
                <MdAdminPanelSettings className="text-xl" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/order" onClick={handleClick}>
                <FaUtensils className="text-md ml-1" />
                My Order
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={handleClick}>
                <IoMdSettings className="text-xl" /> Setting
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={handleClick}>
                <MdOutlineSupportAgent className="text-xl" /> Support
              </Link>
            </li>

            <hr />

            <li>
              <Link onClick={handlelogout}>
                <IoLogOut className="text-xl" /> logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
