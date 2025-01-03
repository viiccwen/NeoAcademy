import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuiz } from "@/hooks/quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/customs/dashboard/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const _quiz = useGetAllQuiz();
  const navigate = useNavigate();
  const quiz = _quiz.data;

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("name"); // Default sort by name

  useEffect(() => {
    _quiz.mutate();
  }, []);

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
    // Filter and Sort Logic
    let filteredQuiz = [...quiz];
    if (filterCategory) {
      if(filterCategory === "All") {
        setFilterCategory(null);
        return;
      }
      filteredQuiz = filteredQuiz.filter((q) => q.category === filterCategory);
    }
    if (filterDifficulty) {
      if(filterDifficulty === "All") {
        setFilterDifficulty(null);
        return;
      }
      filteredQuiz = filteredQuiz.filter(
        (q) => q.difficulty === filterDifficulty
      );
    }

    if (sortOrder === "date") {
      filteredQuiz.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOrder === "difficulty") {
      const difficultyOrder = ["Easy", "Medium", "Hard"];
      filteredQuiz.sort(
        (a, b) =>
          difficultyOrder.indexOf(a.difficulty) -
          difficultyOrder.indexOf(b.difficulty)
      );
    } else if (sortOrder === "category") {
      filteredQuiz.sort((a, b) => a.category.localeCompare(b.category));
    }

    return (
      <div className="min-h-screen bg-gray-900 py-8 px-4 text-white">
        {/* Navbar */}
        <NavBar />

        <div className="max-w-5xl mx-auto pt-20">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            Dashboard
          </h1>

          {/* Filter and Sort Controls */}
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            {/* Filter by Category */}
            <Select onValueChange={(value) => setFilterCategory(value || null)}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Language">Language</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter by Difficulty */}
            <Select
              onValueChange={(value) => setFilterDifficulty(value || null)}
            >
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Filter by Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuiz.map((q) => (
              <Card
                key={q.id}
                className="bg-gray-800 border-gray-700 hover:shadow-lg transition duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {q.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={`${
                        q.difficulty === "Easy"
                          ? "bg-green-500"
                          : q.difficulty === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {q.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-400">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-300 mb-4">
                    Category: <span className="font-medium">{q.category}</span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Multiple Answers:{" "}
                    <span className="font-medium">
                      {q.multipleAnswers ? "Yes" : "No"}
                    </span>
                  </p>
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="default"
                      onClick={() => navigate(`/quiz/${q.id}/1`)}
                    >
                      Start Quiz
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/result/${q.id}`)}
                    >
                      View Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      Something went wrong...
    </div>
  );
}
