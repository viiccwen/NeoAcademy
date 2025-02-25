import { useState, useCallback, useEffect } from "react";
import { Toaster } from "sonner";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavBar } from "@/components/customs/dashboard/navbar";
import { Metadata } from "@/components/customs/metadata";
import { ChatBot } from "@/components/customs/roadmap/chatbot";
import { useGetRoadmap } from "@/hooks/roadmap";
import { Roadmap } from "@/lib/type";
import { DeleteRoadmapDialog } from "@/components/customs/roadmap/delete-dialog";

export default function RoadMap() {
  const { id } = useParams();
  const { data: roadmap, isError, isPending } = useGetRoadmap(id || "");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const [overallProgress, setOverallProgress] = useState(0);

  // calculate progress
  const calculateProgress = useCallback(() => {
    if (!roadmap) return 0;

    const totalSubsections = roadmap.sections.reduce(
      (acc, section) => acc + section.subsections.length,
      0
    );
    const completedSubsections = Object.values(progress).filter(Boolean).length;
    return Math.round((completedSubsections / totalSubsections) * 100);
  }, [progress]);

  // toggle section
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // update progress
  const toggleProgress = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // check if all subsections in a section are completed
  const isSectionCompleted = (section: Roadmap["sections"][number]) => {
    return section.subsections.every((sub) => progress[sub.id] || false);
  };

  // update overall progress
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
              <DeleteRoadmapDialog roadmapId={roadmap.id} />
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
                        // if all subsections are completed, uncheck all
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

        <ChatBot initialMessages={["你好！需要幫助嗎？"]} />
      </div>
    </>
  );
}
