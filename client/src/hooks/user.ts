import { deleteUser, getUser } from "@/actions/user-actions";
import { DelayFunc } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUser = () => {
  return useQuery({
    queryKey: ["user", "details"],
    queryFn: getUser,
  });
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
