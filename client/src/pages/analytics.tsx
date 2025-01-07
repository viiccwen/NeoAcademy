import { NavBar } from "@/components/customs/dashboard/navbar";
import Markdown from "react-markdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, Bar } from "react-chartjs-2";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Metadata } from "@/components/customs/metadata";
import { AnsweredQuestionType, GetQuizType } from "@/lib/type";
import { useGetAllQuizDetails } from "@/hooks/quiz";
import { useAnalyze, useAuth } from "@/hooks/user";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Analytics() {
  const navigate = useNavigate();
  const { analyze, content, isLoading } = useAnalyze();
  const { isAuth } = useAuth();
  const _quiz = useGetAllQuizDetails();
  const quiz = _quiz.data;

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  const onAnalyze = () => {
    analyze();
  };

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

  // calculate quiz stats
  const quizStats = () => {
    if (!quiz) return null;

    const difficultyCount: Record<string, number> = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };
    const categoryCount: Record<string, number> = {
      Math: 0,
      Science: 0,
      History: 0,
      Language: 0,
      Programming: 0,
    };

    quiz.forEach((q) => {
      if (difficultyCount[q.difficulty] !== undefined)
        difficultyCount[q.difficulty]++;
      if (categoryCount[q.category] !== undefined) categoryCount[q.category]++;
    });

    const completedQuizzes: GetQuizType<AnsweredQuestionType>[] = quiz.filter(
      (q) => q.answered
    ) as GetQuizType<AnsweredQuestionType>[];
    const totalQuizzes = quiz.length;
    const totalQuestions = quiz.reduce((sum, q) => sum + q.questions.length, 0);

    const totalCorrectAnswers = completedQuizzes.reduce(
      (sum, q) =>
        sum +
        q.questions.reduce(
          (qSum, qItem) =>
            qSum +
            (qItem.response.filter((r) => qItem.answer.includes(r)).length > 0
              ? 1
              : 0),
          0
        ),
      0
    );

    const correctRate = (totalCorrectAnswers / totalQuestions) * 100;
    const highestScore = Math.max(
      ...completedQuizzes.map(
        (q) =>
          q.questions.filter((qItem) =>
            qItem.response.every((r) => qItem.answer.includes(r))
          ).length
      )
    );
    const lowestScore = Math.min(
      ...completedQuizzes.map(
        (q) =>
          q.questions.filter((qItem) =>
            qItem.response.every((r) => qItem.answer.includes(r))
          ).length
      )
    );
    const averageScore = totalCorrectAnswers / totalQuizzes;

    return {
      totalQuizzes,
      completedQuizzes,
      totalQuestions,
      correctRate,
      highestScore,
      lowestScore,
      averageScore,
      difficultyCount,
      categoryCount,
    };
  };

  if (_quiz.isSuccess) {
    console.log(quiz);
  }

  if (_quiz.isSuccess && quiz && quizStats) {
    const QuizStats = quizStats();
    return (
      <>
        <Toaster richColors />
        <Metadata
          title="Analysis"
          description="Track your learning progress with AI-driven analytics and personalized insights."
        />
        <div className="min-h-screen bg-gray-900 py-4 px-4 text-white">
          <NavBar />
          <div className="max-w-5xl w-1/2 mx-auto pt-20">
            <h1 className="text-4xl font-extrabold text-center mb-8">
              Quiz Analysis
            </h1>

            {/* 測驗總覽數據 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Total Quizzes</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold text-center">
                  {QuizStats?.totalQuizzes}
                </CardContent>
              </Card>

              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Average Score</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold text-center">
                  {QuizStats?.averageScore.toFixed(2)}
                </CardContent>
              </Card>

              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Correct Rate</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold text-center">
                  {QuizStats?.correctRate.toFixed(2)}%
                </CardContent>
              </Card>
            </div>

            {/* 圖表區域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* 測驗難度分析 */}
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle>Quiz Difficulty Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie
                    data={{
                      labels: ["Easy", "Medium", "Hard"],
                      datasets: [
                        {
                          data: QuizStats
                            ? Object.values(QuizStats.difficultyCount)
                            : [],
                          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                        },
                      ],
                    }}
                  />
                </CardContent>
              </Card>

              {/* AI 評語區塊 */}
              <Card className="bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    AI Insights & Recommendations{" "}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-blue-500 duration-300"
                      onClick={onAnalyze}
                      disabled={isLoading}
                    >
                      <RotateCcw className="w4" />{" "}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  {QuizStats && content ? (
                    <Markdown>{content}</Markdown>
                  ) : (
                    "按下按鈕以獲取 AI 分析"
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 測驗結果統計表格 */}
            <Card className="bg-gray-800 mt-10">
              <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quiz.map((q, _) => (
                      <TableRow key={q.id}>
                        <TableCell>{q.name}</TableCell>
                        <TableCell>{q.category}</TableCell>
                        <TableCell>{q.difficulty}</TableCell>
                        <TableCell>
                          {q.answered
                            ? (q.questions as AnsweredQuestionType[]).filter(
                                (qItem) =>
                                  qItem.response.every((r) =>
                                    qItem.answer.includes(r)
                                  )
                              ).length
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 科目類別分析 */}
            <Card className="bg-gray-800 mt-10">
              <CardHeader>
                <CardTitle>Quiz Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar
                  data={{
                    labels: [
                      "Math",
                      "Science",
                      "History",
                      "Language",
                      "Programming",
                    ],
                    datasets: [
                      {
                        label: "Math",
                        data: [QuizStats?.categoryCount.Math, 0, 0, 0],
                        backgroundColor: "#3b82f6", // 藍色
                      },
                      {
                        label: "Science",
                        data: [0, QuizStats?.categoryCount.Science, 0, 0],
                        backgroundColor: "#22c55e", // 綠色
                      },
                      {
                        label: "History",
                        data: [0, 0, QuizStats?.categoryCount.History, 0],
                        backgroundColor: "#f59e0b", // 黃色
                      },
                      {
                        label: "Language",
                        data: [0, 0, 0, QuizStats?.categoryCount.Language],
                        backgroundColor: "#ec4899", // 粉色
                      },
                      {
                        label: "Programming",
                        data: [
                          0,
                          0,
                          0,
                          0,
                          QuizStats?.categoryCount.Programming,
                        ],
                        backgroundColor: "#f87171", // 紅色
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                    scales: {
                      x: { stacked: true },
                      y: { stacked: true },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>{" "}
      </>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      Something went wrong...
    </div>
  );
}
