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
import { Metadata } from "@/components/customs/metadata";
import { Toaster } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/hooks/dashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
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
  } = useDashboard();

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    navigate("/notfound");
    return null;
  }

  return (
    <>
      <Toaster richColors />
      <Metadata
        title="Dashboard"
        description="View all available quizzes and start learning!"
      />

      <div className="min-h-screen p-4">
        <NavBar />

        <div className="max-w-7xl mx-auto mt-10">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">學習路徑</h1>
              <p className="text-gray-600">管理和創建您的學習路徑</p>
            </div>
            <Link to="/roadmap/create">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                創建測驗
              </Button>
            </Link>
          </div>

          {/* Filter and Sort Controls */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="搜尋測驗..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 focus:ring-blue-500"
              />
            </div>

            {/* Filter by Category */}
            <Select
              value={filterCategory || "All"}
              onValueChange={(value) =>
                setFilterCategory(value === "All" ? null : value)
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
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
              value={filterDifficulty || "All"}
              onValueChange={(value) =>
                setFilterDifficulty(value === "All" ? null : value)
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
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
              value={sortOrder}
              onValueChange={(value) =>
                setSortOrder(
                  value as "name" | "date" | "difficulty" | "category"
                )
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">名稱</SelectItem>
                <SelectItem value="date">日期</SelectItem>
                <SelectItem value="difficulty">難度</SelectItem>
                <SelectItem value="category">種類</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quiz Grid */}
          {filteredQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              沒有找到符合條件的測驗
            </div>
          )}
        </div>
      </div>
    </>
  );
}
