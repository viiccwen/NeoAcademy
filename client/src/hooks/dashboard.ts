import { useMemo, useState } from "react";
import { useGetAllQuiz } from "./quiz";
import { FilterHelper, SortHelper } from "@/lib/utils";

export const useDashboard = () => {
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
    isError,
  };
};
