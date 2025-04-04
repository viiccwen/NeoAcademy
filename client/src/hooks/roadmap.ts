import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  createRoadmap,
  deleteRoadmap,
  getRoadmap,
  getRoadmaps,
  updateRoadmap,
} from "@/actions/roadmap-actions";
import {
  CreateRoadmapType,
  Roadmap,
  Section,
  updateSectionType,
} from "@/lib/type";
import { DelayFunc } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRoadmap = () => {
  const { id } = useParams();
  const { token } = useUserStore();
  const { data: roadmap, isError, isPending } = useGetRoadmap(id || "");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [overallProgress, setOverallProgress] = useState(0);

  // update section
  // if all subsections are completed, uncheck all
  const updateSection = (section: Section) => {
    const newProgress = { ...progress };
    section.subsections.forEach((sub) => {
      newProgress[sub.id] = !isSectionCompleted(section);
    });
    setProgress(newProgress);

    if (!roadmap) {
      toast.error("找不到路徑！請重試！");
      return;
    }

    const formdata: updateSectionType = {
      sectionId: section.id,
      checked: !isSectionCompleted(section),
    };

    toast.promise(updateRoadmap(token!, roadmap.id, formdata), {
      loading: "更新學習進度中...",
      success: "學習進度更新成功！",
      error: "更新學習進度失敗！",
    });
  };

  // update progress
  const updateSubsection = (subsectionId: string) => {
    setProgress((prev) => ({
      ...prev,
      [subsectionId]: !prev[subsectionId],
    }));

    const sectionId = roadmap?.sections.find((section) =>
      section.subsections.find((sub) => sub.id === subsectionId)
    )?.id;

    if (!sectionId) {
      toast.error("找不到路徑章節！請重試！");
      return;
    }

    const formdata: updateSectionType = {
      sectionId,
      subsectionId,
      checked: !progress[subsectionId],
    };

    toast.promise(updateRoadmap(token!, roadmap.id, formdata), {
      loading: "更新學習進度中...",
      success: "學習進度更新成功！",
      error: "更新學習進度失敗！",
    });
  };

  // calculate progress
  const calculateProgress = useCallback(() => {
    if (!roadmap) return 0;

    const totalSubsections = roadmap.sections.reduce(
      (acc, section) => acc + section.subsections.length,
      0
    );
    const completedSubsections = Object.values(progress).filter(Boolean).length;
    return Math.round((completedSubsections / totalSubsections) * 100);
  }, [progress, roadmap]);

  // toggle section
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // check if all subsections in a section are completed
  const isSectionCompleted = (section: Roadmap["sections"][number]) => {
    return section.subsections.every((sub) => progress[sub.id] || false);
  };

  useEffect(() => {
    if (roadmap) {
      const initialProgress: { [key: string]: boolean } = {};
      roadmap.sections.forEach((section) => {
        section.subsections.forEach((subsection) => {
          initialProgress[subsection.id] = subsection.checked;
        });
      });
      setProgress(initialProgress);
    }
  }, [roadmap]);

  // update overall progress
  useEffect(() => {
    setOverallProgress(calculateProgress());
  }, [progress]);

  return {
    roadmap,
    isError,
    isPending,
    expandedSections,
    progress,
    setProgress,
    updateSection,
    updateSubsection,
    overallProgress,
    toggleSection,
    isSectionCompleted,
  };
};

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

export const useDeleteRoadmap = () => {
  const { token } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["roadmap", "delete"],
    mutationFn: (id: string) => deleteRoadmap(token!, id),
    onMutate: () => {
      toast.loading("刪除路徑中...");
    },
    onError: (error: any) => {
      // close loading toast
      toast.dismiss();
      toast.error(error.message || "Error Occurred!");
    },
    onSuccess: async () => {
      // close loading toast
      toast.dismiss();
      toast.success("學習路徑刪除成功！");

      // redirect to roadmap page
      await DelayFunc({
        isError: false,
        delay: 2000,
        func: () => navigate("/roadmap"),
      });
    },
  });
};
