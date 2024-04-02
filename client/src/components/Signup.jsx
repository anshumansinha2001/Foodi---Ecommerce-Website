import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, signUpWithGmail, updateUserProfile } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const axiosPublic = useAxiosPublic();

  // For redirecting to home pafe or any specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  //? Image Hosting Key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // Manually Signup
  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const imageFile = { image: data.image[0] };

    //if image is not there
    if (!imageFile.image?.name) {
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          updateUserProfile(data.name, data.photoURL).then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            };
            axiosPublic.post("/users", userInfo).then((response) => {
              console.log("[New User Created]", response);
              toast.success("Account Creation Successfully Done!");
              navigate(from, { replace: true });
            });
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("Signup ERROR: ", errorMessage);
        });
    } else {
      try {
        const hostingImage = await axiosPublic.post(
          image_hosting_api,
          imageFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Check whether image conversion was successful
        if (hostingImage.data.success) {
          createUser(email, password)
            .then((result) => {
              const user = result.user;
              updateUserProfile(
                data.name,
                hostingImage.data.data.display_url
              ).then(() => {
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  photoURL: hostingImage.data.data.display_url,
                };
                axiosPublic.post("/users", userInfo).then((response) => {
                  toast.success("Account Creation Successfully Done!");
                  navigate(from, { replace: true });
                });
              });
            })
            .catch((error) => {
              const errorMessage = error.message;
              console.log("Signup ERROR: ", errorMessage);
            });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "This image format is not supported. Please choose different image.",
        });
      }
    }

    // createUser(email, password)
    //   .then((result) => {
    //     const user = result.user;
    //     updateUserProfile(data.name, data.photoURL).then(() => {
    //       const userInfo = {
    //         name: data.name,
    //         email: data.email,
    //         photoURL: data.photoURL,
    //       };
    //       axiosPublic.post("/users", userInfo).then((response) => {
    //         // console.log(response);
    //         toast.success("Account Creation Successfully Done!");
    //         navigate(from, { replace: true });
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     const errorMessage = error.message;
    //     console.log("Signup ERROR: ", errorMessage);
    //   });
  };

  // // Signup with Google
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
          toast.success("Account Creation Successfully Done!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg w-full mx-auto flex justify-center items-center my-20">
      <div className="modal-action w-full flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body relative"
          method="dialog"
        >
          <h2 className="font-bold text-xl">Create An Account</h2>

          {/* Name*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>

          {/* Upload Image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="file-input  w-full"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Email <span className="text-red">*</span>
              </span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Password <span className="text-red">*</span>
              </span>
            </label>
            <input
              type="password"
              placeholder="Your Password"
              className="input input-bordered"
              {...register("password", { required: true })}
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
          ) : null}

          {/* Signup btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>

          {/* Login btn */}
          <p className="text-center my-2">
            Already have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              {" "}
              Login
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        <Modal />

        {/* Social btns */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleRegister}
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

export default Signup;
