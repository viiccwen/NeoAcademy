import { deleteUser, getUser } from "@/actions/user-actions";
import { DelayFunc } from "@/lib/utils";
import { UserType, useUserStore } from "@/stores/user-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const navigate = useNavigate();
  const { token, isAuth, setIsAuth, setUser, reset } = useUserStore();

  const {
    data: user,
    isFetching,
    isError,
  } = useQuery<UserType>({
    queryKey: ["user", "details"],
    queryFn: () => getUser(token),
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      reset();
      navigate("/login");
    }
    if (user && !isAuth) {
      setIsAuth(true);
      setUser({ name: user.name, email: user.email });
    }
  }, [user, isError]);

  return { isAuth, isLoading: isFetching, user };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useUserStore();

  const Logout = () => {
    logout();
    queryClient.removeQueries({ queryKey: ["user"] }); // remove cache
    navigate("/");
  };

  return Logout;
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onMutate: () => {
      toast.loading("Deleting User...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      // close loading toast
      toast.dismiss();
      toast.success("User Deleted Successfully!");
      await DelayFunc({
        isError: false,
        delay: 2000,
        func: () => (window.location.href = "/login"),
      });
    },
  });
};