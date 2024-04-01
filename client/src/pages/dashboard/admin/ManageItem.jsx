import React from "react";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItem = () => {
  const [menu, loading, refetch] = useMenu();

  const axiosSecure = useAxiosSecure();

  // Handle Delte Items
  const handleDeleteItem = async (item) => {
    try {
      const { value: confirmed } = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete '${item.name}'. This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (confirmed) {
        await axiosSecure.delete(`/menu/${item._id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete item. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All{" "}
        <span className="text-green underline underline-offset-4">
          Menu Items
        </span>
      </h2>

      {/* Menu Table */}
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="table">
          {/* head */}
          <thead className="text-center bg-green text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
              <th></th>
            </tr>
          </thead>

          {/* row 1 */}
          <tbody className="text-center">
            {menu.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt="Item-img" />
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button className="btn btn-sm bg-orange-400 text-white">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost btn-sm text-red"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItem;
