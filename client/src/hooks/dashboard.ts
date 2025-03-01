import { useEffect, useMemo, useState } from "react";
import { useGetAllQuiz } from "./quiz";
import { FilterHelper, SortHelper } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const useDashboard = () => {
  const navigate = useNavigate();
  const { quizzes, isPending, isError } = useGetAllQuiz();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "name" | "date" | "difficulty" | "category"
  >("name");
  const [search, setSearch] = useState("");

  const filteredQuizzes = useMemo(() => {
    if (!quizzes) return [];

    // search filter
    let result = quizzes.filter((quiz) =>
      quiz.name.toLowerCase().includes(search.toLowerCase())
    );

    // category and difficulty filter
    result = FilterHelper(result, filterCategory, filterDifficulty);

    // sort
    return SortHelper(result, sortOrder);
  }, [quizzes, search, filterCategory, filterDifficulty, sortOrder]);

  useEffect(() => {
    if (isError) {
      navigate("/notfound");
    }
  }, [isError, navigate]);

  return {
    filteredQuizzes,
    search,
    setSearch,
    filterCategory,
    setFilterCategory,
    filterDifficulty,
    setFilterDifficulty,
    sortOrder,
    setSortOrder,
    isPending,
    navigate,
  };
};
