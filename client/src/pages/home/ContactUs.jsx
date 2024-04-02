import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [result, setResult] = useState("");

  const ACCESS_KEY = import.meta.env.VITE_WEB3_ACCESS_KEY;

  // Handle Submit Form
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult(data.message);
      console.log("Error", data);
    }
  };

  return (
    <div className="section-container">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="md:pt-28 pt-20 md:pb-14 pb-6 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-4xl text-2xl font-bold md:leading-snug leading-snug">
              How Can We Help You ?
            </h2>
          </div>
        </div>
      </div>

      {/* ContactUS Section*/}
      <div className="hero bg-base-200 shadow md:py-20 py-8">
        <div className="hero-content flex-col lg:flex-row justify-between">
          <div className="md:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-green">
              Customer Support 📩
            </h1>
            <hr className="mt-4" />
            <p className="py-6 text-start">
              Please share the details of your query or concern in this provided
              form. We're here to assist you and resolve any issues you may
              have. Your feedback is valuable to us, so please feel free to
              express your thoughts openly. Thank you for reaching out to us.
              We'll do our best to address your needs promptly and effectively.
            </p>
          </div>

          {/* FORM SECTION */}
          <div className="card mx-auto shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={onSubmit}>
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-success"
                  required
                />
              </div>
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input input-success"
                  required
                />
              </div>
              {/* Message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  name="message"
                  className="textarea textarea-success"
                  placeholder="Type Your Query Here"
                ></textarea>
              </div>
              {/* error text*/}
              <span className="text-xs italic text-red">{result}</span>

              <div className="form-control mt-6">
                <button type="submit" className="btn bg-green text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
