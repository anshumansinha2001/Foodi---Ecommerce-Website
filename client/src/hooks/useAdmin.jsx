import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  const { data: users = [], isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
  });

  const isAdmin = users.some(
    (user) => user.email === currentUser.email && user.role === "admin"
  );

  return {
    isAdmin,
    isAdminLoading: false, // Since we're not fetching isAdmin separately, set to false
    isAdminError: isError, // Use isError from useQuery for error handling
    refetchAdmin: () => {}, // No need to refetch separately
  };
};

export default useAdmin;
