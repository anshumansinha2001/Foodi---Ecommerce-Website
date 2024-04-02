import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const API = import.meta.env.VITE_APP_URI_API;

  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);

  //Fetching the Order Details from Backend
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(`${API}/payments/${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  // console.log("[ORDER]", orders);

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="section-container">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="md:pt-28 pt-20 md:pb-14 pb-6 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Display orders table */}
      {orders.length > 0 ? (
        <div>
          <div className="overflow-x-auto rounded-md shadow-md mb-10">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-green text-white text-center">
                <tr>
                  <th>#</th>
                  <th>Order Date</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Transaction Id</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Support</th>
                </tr>
              </thead>
              {/* body */}
              <tbody className="text-center">
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td className="flex justify-center">
                      <div className="flex items-center gap-3 w-fit">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.itemImage} alt="imgItem" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-start">
                            {item.itemName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.transactionId}</td>
                    <td>${item.price}</td>
                    <td className={item.statusColor}>{item.status}</td>
                    <td>
                      <Link to="/contact-us">
                        <button className="btn btn-xs bg-indigo-500 text-white">
                          Contact
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>

          <hr />
        </div>
      ) : (
        //Display Empty Order
        <div className="text-center mt-10 space-y-11">
          <img
            className="mask mask-squircle inline-block w-72"
            src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
          />
          <p>You have not made any order lately! Go and do it now🥹.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white my-6">
              Back to Shoping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
