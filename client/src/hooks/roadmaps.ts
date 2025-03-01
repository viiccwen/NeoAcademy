import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoadmaps } from "./roadmap";

export const useRoadmaps = () => {
  const navigate = useNavigate();
  const { data: roadmaps, isError, isPending } = useGetRoadmaps();
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string>("");

  // filter roadmaps
  const filteredRoadmaps = roadmaps?.filter((roadmap) => {
    const matchesSearch =
      roadmap.name.toLowerCase().includes(search.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = !topic || roadmap.topic === topic;
    return matchesSearch && matchesTopic;
  });

  useEffect(() => {
    if (isError) {
      navigate("/notfound");
    }
  }, [isError, navigate]);

  return {
    filteredRoadmaps,
    search,
    setSearch,
    topic,
    setTopic,
    isPending,
    navigate
  };
};
