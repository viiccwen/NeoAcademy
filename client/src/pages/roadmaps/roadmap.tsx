import { useState, useCallback, useEffect } from "react";
import { Toaster } from "sonner";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavBar } from "@/components/customs/dashboard/navbar";
import { Metadata } from "@/components/customs/metadata";
import { useDeleteRoadmap, useGetRoadmap } from "@/hooks/roadmap";
import { Roadmap } from "@/lib/type";

export default function RoadMap() {
  const { id } = useParams();
  const { data: roadmap, isError, isPending } = useGetRoadmap(id || "");
  const mutation = useDeleteRoadmap();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 計算總進度
  const calculateProgress = useCallback(() => {
    if (!roadmap) return 0;

    const totalSubsections = roadmap.sections.reduce(
      (acc, section) => acc + section.subsections.length,
      0
    );
    const completedSubsections = Object.values(progress).filter(Boolean).length;
    return Math.round((completedSubsections / totalSubsections) * 100);
  }, [progress]);

  // 切換展開/收合
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // 更新勾選狀態
  const toggleProgress = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 檢查章節是否全部完成
  const isSectionCompleted = (section: Roadmap["sections"][number]) => {
    return section.subsections.every((sub) => progress[sub.id] || false);
  };

  const onDelete = async () => {
    if (!id) return;
    await mutation.mutateAsync(id);
  };

  // 更新進度
  useEffect(() => {
    setOverallProgress(calculateProgress());
  }, [progress]);

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Error occurred!
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Roadmap not found!
      </div>
    );
  }

  return (
    <>
      <Toaster richColors />
      <Metadata title={roadmap.name} description={roadmap.description} />

      <div className="min-h-screen py-4 px-4">
        <NavBar />

        <div className="mx-auto max-w-4xl mt-5">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="mb-2 text-3xl font-bold">{roadmap.name}</h1>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive" // 使用 destructive 样式以突出删除操作
                    className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                  >
                    刪除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>確認刪除</AlertDialogTitle>
                    <AlertDialogDescription>
                      您確定要刪除此學習路線圖嗎？此操作無法撤銷。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                      確認刪除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="mb-4">{roadmap.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">總體進度</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {roadmap.sections.map((section) => (
              <Card key={section.id} className="overflow-hidden">
                {/* Section header */}
                <div className="border-b p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={isSectionCompleted(section)}
                      onCheckedChange={() => {
                        // 如果章節未完成，將所有小節標記為完成
                        const newProgress = { ...progress };
                        section.subsections.forEach((sub) => {
                          newProgress[sub.id] = !isSectionCompleted(section);
                        });
                        setProgress(newProgress);
                      }}
                    />
                    <div className="flex-1">
                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => toggleSection(section.id)}
                      >
                        {expandedSections.includes(section.id) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                        <div>
                          <label
                            htmlFor={section.id}
                            className="text-lg font-medium hover:cursor-pointer"
                          >
                            {section.title}
                          </label>
                          <p className="text-sm">{section.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subsections */}
                {expandedSections.includes(section.id) && (
                  <div className="divide-y ">
                    {section.subsections.map((subsection) => (
                      <div
                        key={subsection.id}
                        className="flex items-center gap-4 p-4 pl-8"
                      >
                        <Checkbox
                          id={subsection.id}
                          checked={progress[subsection.id] || false}
                          onCheckedChange={() => toggleProgress(subsection.id)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={subsection.id}
                            className="font-medium hover:cursor-pointer"
                          >
                            {subsection.title}
                          </label>
                          <p className="text-sm">{subsection.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
