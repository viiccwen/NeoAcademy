import { Toaster } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { NavBar } from "@/components/customs/dashboard/navbar";
import { Metadata } from "@/components/customs/metadata";
import { ChatBot } from "@/components/customs/roadmap/chatbot";
import { useRoadmap } from "@/hooks/roadmap";
import { DeleteRoadmapDialog } from "@/components/customs/roadmap/delete-dialog";
import { useChatbot } from "@/hooks/chatbot";
import { Button } from "@/components/ui/button";

export default function RoadMap() {
  const {
    roadmap,
    isError,
    isPending,
    expandedSections,
    progress,
    updateSection,
    updateSubsection,
    overallProgress,
    toggleSection,
    isSectionCompleted,
  } = useRoadmap();

  const { setInputFromExternal } = useChatbot();

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
              <h1 className="text-xl sm:text-3xl font-bold">{roadmap.name}</h1>
              <DeleteRoadmapDialog roadmapId={roadmap.id} />
            </div>
            <p className="mb-4 text-sm text-slate-300 sm:text-base mt-3">{roadmap.description}</p>
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
                      onCheckedChange={() => updateSection(section)}
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
                            className="text-base sm:text-lg font-medium hover:cursor-pointer"
                          >
                            {section.title}
                          </label>
                          <p className="text-sm text-slate-400">{section.description}</p>
                        </div>
                      </div>
                    </div>
                    {/* 複製按鈕 */}
                    <Button
                      variant="ghost"
                      type="button"
                      size="sm"
                      onClick={() =>
                        setInputFromExternal(
                          `請幫助我了解 ${section.title}: ${section.description || ""}`
                        )
                      }
                      aria-label="Copy section to chatbot"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
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
                          onCheckedChange={() =>
                            updateSubsection(subsection.id)
                          }
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={subsection.id}
                            className="font-medium hover:cursor-pointer"
                          >
                            {subsection.title}
                          </label>
                          <p className="text-sm text-slate-400">{subsection.description}</p>
                        </div>
                        {/* 複製按鈕 */}
                        <Button
                          variant="ghost"
                          type="button"
                          size="sm"
                          onClick={() =>
                            setInputFromExternal(
                              `請幫助我了解 ${subsection.title}: ${subsection.description || ""}`
                            )
                          }
                          aria-label="Copy section to chatbot"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
}
