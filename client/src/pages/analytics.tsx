import { Toaster } from "sonner";
import Markdown from "react-markdown";
import { NavBar } from "@/components/customs/dashboard/navbar";
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
import { AnsweredQuestionType } from "@/lib/type";
import { translateCategory, translateDifficulty } from "@/lib/utils";
import { AISmallButton } from "@/components/customs/quiz/ai-button";
import { useAnalyze } from "@/hooks/analytics";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Analytics() {
  const { analyze, content, isLoading, isPending, isSuccess, quiz, quizStats } =
    useAnalyze();

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-base sm:text-lg">
        Loading...
      </div>
    );
  }

  if (isSuccess && quiz && quizStats) {
    const QuizStats = quizStats();
    return (
      <>
        <Toaster richColors />
        <Metadata
          title="分析"
          description="Track your learning progress with AI-driven analytics and personalized insights."
        />
        <div className="min-h-screen py-4 px-4 sm:px-6 md:px-8 text-white">
          <NavBar />
          <div className="max-w-5xl w-full mx-auto pt-16 sm:pt-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8">
              測驗分析
            </h1>

            {/* Quiz Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">
                    測驗總計
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xl sm:text-2xl font-bold text-center">
                  {QuizStats?.totalQuizzes}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">
                    平均分數
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xl sm:text-2xl font-bold text-center">
                  {QuizStats?.averageScore.toFixed(2)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base">
                    正確率
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xl sm:text-2xl font-bold text-center">
                  {QuizStats?.correctRate.toFixed(2)}%
                </CardContent>
              </Card>
            </div>

            {/* Graph Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
              {/* Quiz Difficulty */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm sm:text-base h-[36px]">
                    測驗難度統計
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="w-full max-w-[300px] sm:max-w-[400px]">
                    <Pie
                      data={{
                        labels: ["簡單", "中等", "困難"],
                        datasets: [
                          {
                            data: QuizStats
                              ? Object.values(QuizStats.difficultyCount)
                              : [],
                            backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* AI Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    AI 分析 & 建議
                    <AISmallButton onClick={analyze} disabled={isLoading} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 text-sm sm:text-base max-h-[300px] overflow-y-auto">
                  {QuizStats && content ? (
                    <Markdown>{content}</Markdown>
                  ) : (
                    "按下按鈕以獲取 AI 分析"
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quiz Result */}
            <Card className="mt-8 sm:mt-10">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">
                  測驗結果
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">名稱</TableHead>
                      <TableHead className="text-xs sm:text-sm">種類</TableHead>
                      <TableHead className="text-xs sm:text-sm">難度</TableHead>
                      <TableHead className="text-xs sm:text-sm">分數</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quiz.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="text-xs sm:text-sm">
                          {q.name}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {translateCategory(q.category)}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {translateDifficulty(q.difficulty)}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
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

            {/* Quiz Category Analytics */}
            <Card className="mt-8 sm:mt-10">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">
                  測驗類別統計
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full max-w-[500px] sm:max-w-[600px]">
                  <Bar
                    data={{
                      labels: ["數學", "自然", "歷史", "語言", "程式語言"],
                      datasets: [
                        {
                          label: "數學",
                          data: [QuizStats?.categoryCount.Math, 0, 0, 0, 0],
                          backgroundColor: "#3b82f6",
                        },
                        {
                          label: "自然",
                          data: [0, QuizStats?.categoryCount.Science, 0, 0, 0],
                          backgroundColor: "#22c55e",
                        },
                        {
                          label: "歷史",
                          data: [0, 0, QuizStats?.categoryCount.History, 0, 0],
                          backgroundColor: "#f59e0b",
                        },
                        {
                          label: "語言",
                          data: [0, 0, 0, QuizStats?.categoryCount.Language, 0],
                          backgroundColor: "#ec4899",
                        },
                        {
                          label: "程式語言",
                          data: [
                            0,
                            0,
                            0,
                            0,
                            QuizStats?.categoryCount.Programming,
                          ],
                          backgroundColor: "#f87171",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "top" },
                      },
                      scales: {
                        x: { stacked: true },
                        y: { stacked: true },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center text-white text-base sm:text-lg">
      Something went wrong...
    </div>
  );
}