import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

import { useDeleteQuiz } from "@/hooks/quiz";
import { GetAllQuizType } from "@/lib/type";

interface QuizCardProps {
  quiz: GetAllQuizType[number];
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  const navigate = useNavigate();
  const deleteQuiz = useDeleteQuiz();

  const handleDeleteQuiz = () => {
    deleteQuiz.mutate(quiz.id);
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition duration-300 relative">
      {/* menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-2 p-3 right-2 text-gray-400 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-slate-700 border-slate-700"
        >
          <DropdownMenuItem
            onClick={() => navigate(`/quiz/${quiz.id}/1`)}
            className=" hover:cursor-pointer hover:bg-slate-500"
          >
            Start Quiz
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/result/${quiz.id}`)}
            className=" hover:cursor-pointer"
          >
            View Results
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteQuiz}
            className="hover:cursor-pointer text-red-500 hover:text-red-500"
          >
            <p className="hover:text-red-500 w-full h-full">Delete Quiz</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* card title */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{quiz.name}</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className={`${
              quiz.difficulty === "Easy"
                ? "bg-green-500"
                : quiz.difficulty === "Medium"
                ? "bg-yellow-500"
                : "bg-red-500"
            } text-white`}
          >
            {quiz.difficulty}
          </Badge>
          <span className="text-sm text-gray-400">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>

      {/* card content */}
      <CardContent className="p-4">
        <p className="text-sm text-gray-300 mb-4">
          Category: <span className="font-medium">{quiz.category}</span>
        </p>
        <p className="text-sm text-gray-300">
          Multiple Answers:{" "}
          <span className="font-medium">
            {quiz.multipleAnswers ? "Yes" : "No"}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
