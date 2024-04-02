import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Manually Login
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide the correct credentials!");
        console.log(errorMessage);
      });
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((response) => {
            toast.success("Login Successful!");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error.response.data.message);
            if (error.response.data.message === "User Already Exists!") {
              toast.success("Login Successful!");
              navigate(from, { replace: true });
            }
          });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20 rounded-lg">
      <div className="mb-5 w-full ">
        <form
          className="card-body relative"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Please Login!</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Your Password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          {/* show errors */}
          {errorMessage ? (
            <p className="text-red text-sm italic font-medium">
              {errorMessage}
            </p>
          ) : (
            ""
          )}

          {/* submit btn */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Login"
            />
          </div>

          {/* close btn */}
          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
          </Link>

          <p className="text-center my-2">
            Donot have an account?
            <Link to="/signup" className="underline text-red ml-1">
              Signup Now
            </Link>
          </p>
        </form>
        <div className="text-center space-x-3">
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
  );
};

export default Login;
