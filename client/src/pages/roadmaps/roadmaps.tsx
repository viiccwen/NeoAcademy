import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Plus,
  Search,
  Code,
  Languages,
  Calculator,
  GraduationCap,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/customs/dashboard/navbar";
import { Metadata } from "@/components/customs/metadata";
import { useGetRoadmaps } from "@/hooks/roadmap";

const topicIcons = {
  Programming: Code,
  Language: Languages,
  Math: Calculator,
  Science: GraduationCap,
};

export default function RoadmapsPage() {
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

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
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
      <Metadata
        title="學習路徑"
        description="View all available quizzes and start learning!"
      />

      <div className="min-h-screen p-4">
        <NavBar />

        <div className="mx-auto max-w-7xl mt-10">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">學習路徑</h1>
              <p>管理和創建您的學習路徑</p>
            </div>
            <Link to="/roadmap/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                創建路徑
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="搜尋路徑..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="選擇主題" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部主題</SelectItem>
                <SelectItem value="Programming">程式設計</SelectItem>
                <SelectItem value="Language">語言學習</SelectItem>
                <SelectItem value="Math">數學</SelectItem>
                <SelectItem value="Science">科學</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Roadmap Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRoadmaps?.map((roadmap) => {
              const TopicIcon =
                topicIcons[roadmap.topic as keyof typeof topicIcons] ||
                BookOpen;

              return (
                <Link key={roadmap.id} to={`/roadmap/${roadmap.id}`}>
                  <Card className="h-full cursor-pointer p-6 transition-all hover:shadow-md">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <TopicIcon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4" />
                        {new Date(roadmap.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="mb-2 text-xl font-semibold">
                      {roadmap.name}
                    </h3>
                    <p className="mb-4 text-sm ">{roadmap.description}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-sm">
                        {roadmap.totalSections} 個章節
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredRoadmaps?.length === 0 && (
            <div className="mt-8 text-center">
              <BookOpen className="mx-auto h-12 w-12" />
              <h3 className="mt-2 text-lg font-medium">沒有找到路徑</h3>
              <p>嘗試使用不同的搜尋條件，或者創建一個新的路徑</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
