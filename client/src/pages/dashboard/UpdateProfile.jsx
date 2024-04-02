import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { updateUserProfile, user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add this line to destructure setValue from useForm
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  //? Image Hosting Key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);

    // Set the default value of the input fields using setValue
    setValue("name", user.displayName);
    setValue("photoURL", user.photoURL);
  }, [setValue, user.displayName, user.photoURL]);

  const onSubmit = async (data) => {
    const name = data.name;
    let photoURL = data.photoURL;
    const imageFile = { image: data.image[0] };

    try {
      // If Image is not upload
      if (!imageFile.image?.name) {
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.info("Changes saved! Updates may take time.");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
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
          photoURL = hostingImage.data.data.display_url;
          updateUserProfile(name, photoURL)
            .then(() => {
              toast.info("Changes saved! Updates may take time.");
              navigate(from, { replace: true });
              // ...
            })
            .catch((error) => {
              console.log(error.message);
              toast.warning("Something went wrong!");
            });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "This image format is not supported. Please change the image.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative rounded-xl md:w-[60%] shadow-2xl bg-black text-white">
        <div className="flex justify-between items-center md:px-8 px-4 my-2">
          {/* Image Area */}
          <div className="w-32">
            <img className="mask mask-square rounded-xl" src={user.photoURL} />
          </div>
          <div>
            <h3 className="font-bold md:text-xl">Update Your Profile 🆔</h3>
            <p className="text-end text-xs text-base-200 mt-1">{user.email}</p>
          </div>
        </div>
        <hr />

        <form
          className="md:card-body px-4 py-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Your Name"
              className="input input-success border-none text-black"
            />
          </div>

          {/* Upload Image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Upload Photo</span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="file-input input-success border-none text-black  w-full"
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-green text-white">Update</button>
          </div>

          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
