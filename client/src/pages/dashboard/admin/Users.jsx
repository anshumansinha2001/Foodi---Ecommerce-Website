import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  // console.log(users);

  const { user: currentUser } = useAuth();

  // Make Admin Functionality
  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}/makeadmin`)
      .then((res) => {
        toast.info(`${user.name} is now Admin`);
        refetch();
      })
      .catch((error) => {
        console.error("Error making admin:", error);
        toast.error("Failed to make user admin");
      });
  };

  // Make User from Admin Functionality
  const handleMakeUserBack = (user) => {
    if (currentUser.email === user.email) {
      alert("Sorry, You can't change your own role");
      return;
    }
    axiosSecure
      .patch(`/users/admin/${user._id}/makeuserback`)
      .then((res) => {
        refetch();
        toast.warning(`${user.name} is now user`);
      })
      .catch((error) => {
        console.error("Error making user back:", error);
        toast.error("Failed to make user a regular user");
      });
  };

  // Handling DELETE User Button
  const handleDeleteUser = (user) => {
    if (currentUser.email === user.email) {
      alert("Sorry, You can't delete yourself!");
      return;
    }
    if (user.role === "admin") {
      alert("Sorry, You can't delete an Admin!");
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to remove ${user.name} from Database?`
      )
    ) {
      axiosSecure
        .delete(`/users/${user._id}`)
        .then((res) => {
          refetch();
          toast.error(`${user.name} has been removed from database`);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user");
        });
    }
  };

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (isError) return <div>Error fetching users :(</div>;

  return (
    <>
      <div className="flex items-center justify-between m-4">
        <h5 className="font-medium">All Users</h5>
        <h5 className="font-medium">Total Users: {users.length}</h5>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto md:w-[870px] mx-auto shadow-md rounded-md">
        <table className="table">
          {/* head */}
          <thead className="text-center bg-green text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* Row Mapping*/}

            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {user.photoURL ? (
                          <img alt="profile" src={user.photoURL} />
                        ) : (
                          <img
                            alt="profile"
                            src="https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-start">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      className="btn btn-xs  bg-indigo-500 text-white"
                      onClick={() => handleMakeUserBack(user)}
                    >
                      Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-circle bg-indigo-500 text-white"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    className="btn bg-orange-500 text-white btn-xs"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};

export default Users;
