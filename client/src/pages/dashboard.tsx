import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/customs/dashboard/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizCard } from "@/components/customs/dashboard/quiz-card";
import { useAuth } from "@/hooks/user";

import { useGetAllQuiz } from "@/hooks/quiz";
import { FilterHelper, SortHelper } from "@/lib/utils";
import { Metadata } from "@/components/customs/metadata";
import { Toaster } from "sonner";

export default function Dashboard() {
  const { isAuth } = useAuth();
  const _quiz = useGetAllQuiz();
  const navigate = useNavigate();
  const quiz = _quiz.data;

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<
    "name" | "date" | "difficulty" | "category"
  >("name"); // Default sort by name

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  if (_quiz.isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (_quiz.isError) {
    navigate("/notfound");
    return null;
  }

  if (_quiz.isSuccess && quiz) {
    // Filter Logic
    let filteredQuiz = FilterHelper(
      quiz,
      filterCategory,
      filterDifficulty,
      setFilterCategory,
      setFilterDifficulty
    );

    // Sort Logic
    filteredQuiz = SortHelper(filteredQuiz, sortOrder);

    return (
      <>
        <Toaster richColors />
        <Metadata
          title="Dashboard"
          description="View all available quizzes and start learning!"
        />

        <div className="min-h-screen bg-gray-900 py-4 px-4 text-white">
          {/* Navbar */}
          <NavBar />

          <div className="max-w-5xl mx-auto pt-20">
            <h1 className="text-4xl font-extrabold text-center mb-8">
              測驗總覽
            </h1>

            {/* Filter and Sort Controls */}
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
              {/* Filter by Category */}
              <Select
                onValueChange={(value) => setFilterCategory(value || null)}
              >
                <SelectTrigger className="w-full md:w-1/3">
                  <SelectValue placeholder="種類" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">所有</SelectItem>
                  <SelectItem value="Math">數學</SelectItem>
                  <SelectItem value="Science">自然</SelectItem>
                  <SelectItem value="History">歷史</SelectItem>
                  <SelectItem value="Language">語言</SelectItem>
                  <SelectItem value="Programming">程式語言</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter by Difficulty */}
              <Select
                onValueChange={(value) => setFilterDifficulty(value || null)}
              >
                <SelectTrigger className="w-full md:w-1/3">
                  <SelectValue placeholder="難度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">所有</SelectItem>
                  <SelectItem value="Easy">簡單</SelectItem>
                  <SelectItem value="Medium">中等</SelectItem>
                  <SelectItem value="Hard">困難</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Select
                onValueChange={(value) =>
                  setSortOrder(
                    value as "name" | "date" | "difficulty" | "category"
                  )
                }
              >
                <SelectTrigger className="w-full md:w-1/3">
                  <SelectValue placeholder="排序" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">日期</SelectItem>
                  <SelectItem value="difficulty">難度</SelectItem>
                  <SelectItem value="category">種類</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuiz.map((q) => (
                <QuizCard key={q.id} quiz={q} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
