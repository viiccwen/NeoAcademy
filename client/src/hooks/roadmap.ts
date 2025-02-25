import {
  createRoadmap,
  getRoadmap,
  getRoadmaps,
} from "@/actions/roadmap-actions";
import { CreateRoadmapType, Roadmap } from "@/lib/type";
import { DelayFunc } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateRoadmap = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["roadmap", "create"],
    mutationFn: (formdata: CreateRoadmapType) =>
      createRoadmap(token!, formdata),
    onMutate: () => {
      toast.loading("創建路徑中...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async (data: Roadmap) => {
      // close loading toast
      toast.dismiss();
      toast.success("學習路徑創建成功！");

      // redirect to roadmap page
      await DelayFunc({
        isError: false,
        delay: 2000,
        func: () => navigate(`/roadmap/${data.id}`),
      });
    },
  });
};

// get all roadmaps
export const useGetRoadmaps = () => {
  const { token } = useUserStore();

  const response = useQuery({
    queryKey: ["roadmap", "get-all"],
    queryFn: () => getRoadmaps(token!),
  });

  return {
    data: response.data,
    isError: response.isError,
    isPending: response.isPending,
  };
};

// get single roadmap
export const useGetRoadmap = (id: string) => {
  const { token } = useUserStore();

  const response = useQuery({
    queryKey: ["roadmap", "get", id],
    queryFn: () => getRoadmap(token!, id),
  });

  return {
    data: response.data,
    isError: response.isError,
    isPending: response.isPending,
  };
};
