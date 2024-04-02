import React from "react";
import useAuth from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <div className="my-8">
        <img
          src="https://t3.ftcdn.net/jpg/03/48/55/20/360_F_348552050_uSbrANL65DNj21FbaCeswpM33mat1Wll.jpg"
          alt="pannel"
        />
      </div>

      <div className="flex justify-around items-center">
        <div>
          <img src={user.photoURL} alt="admin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl text-center">HELLO ADMIN</h2>
          <p className="text-center">
            Lets see what would you like to do today.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
