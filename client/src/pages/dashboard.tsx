import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuiz } from "@/hooks/quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/customs/dashboard/navbar";

export default function Dashboard() {
  const _quiz = useGetAllQuiz();
  const navigate = useNavigate();
  const quiz = _quiz.data;

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
    return (
      <div className="min-h-screen h-[5000px] bg-gray-900 py-8 px-4 text-white">
        {/* Navbar */}
        <NavBar className="p-4 top-0 w-full left-0 z-50 fixed" />

        <div className="max-w-5xl mx-auto pt-20">
          <h1 className="text-4xl font-extrabold text-center mb-8">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quiz.map((q) => (
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
                    <Button variant="default" LinkTo={`/quiz/${q.id}/1`}>
                      Start Quiz
                    </Button>
                    <Button
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shover:shadow-lg"
                      LinkTo={`/result/${q.id}`}
                    >
                     Results
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
