import { useEffect, useRef } from "react";
import { Zap, Bot, Shapes, User } from "lucide-react";
import { cn } from "@/lib/utils"; // 假設你有這個工具函數來合併 className

const features = [
  {
    icon: Bot,
    title: "AI 驅動個人化學習",
    description:
      "運用 LLM 技術，提供量身打造的學習內容，讓學習更加符合你的需求。",
  },
  {
    icon: User,
    title: "學習詢問及回饋",
    description:
      "詢問智慧教學助理，即時獲得學習資訊，讓你能夠快速修正並持續進步。",
  },
  {
    icon: Zap,
    title: "最佳化學習路徑",
    description:
      "透過 AI 智能學習規劃，根據你的程度、目標自動調整，幫助你高效達成學習成果。",
  },
  {
    icon: Shapes,
    title: "強弱項分析及建議",
    description:
      "根據你的能力與學習狀況，提供數據化分析及文字建議，確保學習順暢且高效。",
  },
];

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements =
      sectionRef.current?.querySelectorAll(".feature-item");
    featureElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-10 sm:mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          我們的特色
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "feature-item group relative p-6 bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50",
                "transition-all duration-300 ease-in-out opacity-0",
                "hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:bg-gray-800/80"
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* icon */}
              <feature.icon
                className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-300"
              />

              {/* title */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* desdription */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};