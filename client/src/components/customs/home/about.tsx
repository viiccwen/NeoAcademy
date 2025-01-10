import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

import ResultBarImg from "@/assets/result-bar.jpg";
import ResultImg from "@/assets/result.jpg";
import QuizImg from "@/assets/quiz.jpg";
import DashboardImg from "@/assets/dashboard.jpg";
import CreateImg from "@/assets/create.jpg";
import AnalyticsImg from "@/assets/analytics.jpg";

type FeatureItem = {
  title: string;
  description: string;
  image: string;
};

const features: FeatureItem[] = [
  {
    title: "AI 智能測驗生成",
    description:
      "透過 AI 量身打造測驗內容。只需提供主題、學習目標、備註，系統即能自動產生有趣且具挑戰性的題目。",
    image: CreateImg,
  },
  {
    title: "智慧學習分析",
    description:
      "透過深入的數據分析追蹤測驗結果與學習進度，並獲取 AI 生成的個人化回饋，幫助你精進理解。",
    image: AnalyticsImg,
  },
  {
    title: "適應式測驗體驗",
    description:
      "享受動態測驗體驗，根據你過往答題表現自動調整題目難度，挑戰自我、穩步提升。",
    image: QuizImg,
  },
  {
    title: "詳細測驗結果解析",
    description:
      "提供完整的答題解析，找出錯誤原因、檢視解釋，並獲得 AI 提供的學習建議，助你精準進步。",
    image: ResultImg,
  },
  {
    title: "全方位學習儀表板",
    description:
      "統整所有測驗與學習進度，一站式管理歷史測驗、追蹤成長曲線，規劃最適合自己的學習策略。",
    image: DashboardImg,
  },
  {
    title: "數據驅動的學習策略",
    description:
      "透過互動式圖表視覺化學習趨勢，系統會根據你的學習狀況提供個性化的學習建議，聚焦提升弱項，讓學習更具效率。",
    image: ResultBarImg,
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
    <section ref={sectionRef} id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-12">
          關於我們
        </h2>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="about-item bg-gray-700 border-gray-600 opacity-0"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <CardContent className="p-6 h-full">
                <div className="grid grid-rows-[auto_1fr] gap-4 h-full">
                  {/* 確保圖片固定大小，避免不對齊 */}
                  <div className="flex h-full items-center">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="rounded-lg w-auto object-cover"
                    />
                  </div>
                  {/* 確保文字區域統一高度 */}
                  <div className="h-full flex flex-col justify-end">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
