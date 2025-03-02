import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import CreateImg from "@/assets/create.jpg";
import AnalyticsImg from "@/assets/analytics.jpg";
import RoadmapImg from "@/assets/roadmap.png";
import ChatbotImg from "@/assets/chatbot.png";

type FeatureItem = {
  title: string;
  description: string;
  image: string;
};

const features: FeatureItem[] = [
  {
    title: "AI 個人化測驗生成",
    description:
      "透過 AI 量身打造測驗內容。只需提供主題、學習目標、備註，系統即能自動產生具挑戰性的題目。",
    image: CreateImg,
  },
  {
    title: "AI 學習路徑生成",
    description:
      "利用 AI 根據你的主題、目標與程度，自動生成個人化學習路徑，幫助你循序漸進達成學習成果。",
    image: RoadmapImg,
  },
  {
    title: "智慧教學助理",
    description:
      "即使有學習路徑仍不知該如何學習？現在我們有 AI 智慧教學助理，即時解答疑惑、提供指引，讓學習過程更順暢且高效。",
    image: ChatbotImg,
  },
  {
    title: "全方位學習儀表板",
    description:
      "透過互動式圖表視覺化學習趨勢，系統會根據你的學習狀況提供個性化的學習建議，聚焦提升弱項，讓學習更具效率。",
    image: AnalyticsImg,
  },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = sectionRef.current?.querySelectorAll(".about-item");
    featureElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-12 sm:py-20 bg-gradient-to-b from-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-10 sm:mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          關於我們
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                "about-item group bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg overflow-hidden",
                "transition-all duration-300 ease-in-out opacity-0",
                "hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2"
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* 圖片區 */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                </div>

                {/* 文字區 */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};