import React, { useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const axiosPublic = useAxiosPublic();

  // For redirecting to home pafe or any specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // This will close the Model Screen
  const closeModel = () => {
    document.getElementById("my_modal_5").close();
  };

  // Manually Login
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful!");
        closeModel();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide the correct credentials!");
        console.log(errorMessage);
      });
  };

  // Google Signin
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          // console.log(response);
          toast.success("Login Successful!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action flex flex-col justify-center mt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
              method="dialog"
            >
              <h2 className="font-bold text-xl">Please Login!</h2>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  {...register("email")}
                  autoComplete="current-email"
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Your Password"
                  className="input input-bordered"
                  {...register("password")}
                  autoComplete="current-password"
                />
                <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Error Text */}
              {errorMessage ? (
                <p className="text-red text-sm italic font-medium">
                  {errorMessage}
                </p>
              ) : (
                ""
              )}

              {/* Login btn */}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn bg-green text-white"
                />
              </div>

              <p className="text-center my-2">
                Don't have an account?
                <Link to="/signup" className="underline text-red ml-1">
                  Signup
                </Link>
              </p>

              <button
                htmlFor="my_modal_5"
                onClick={() => closeModel()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {/* Social btns */}
            <div className="text-center space-x-3 mb-5">
              <button
                onClick={handleRegister}
                className="btn btn-circle hover:bg-green hover:text-white"
              >
                <FaGoogle />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaFacebookF />
              </button>
              <button className="btn btn-circle hover:bg-green hover:text-white">
                <FaGithub />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
