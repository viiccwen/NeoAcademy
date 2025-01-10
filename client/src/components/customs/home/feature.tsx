import { useEffect, useRef } from "react";
import { Zap, Bot, Shapes, User } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI 驅動客製化學習",
    description:
      "運用 LLM 技術，提供量身打造的學習內容，讓學習更加符合你的需求。",
  },
  {
    icon: Zap,
    title: "最佳化學習路徑",
    description:
      "透過 AI 智能學習規劃，根據你的目標自動調整，幫助你高效達成學習成果。",
  },
  {
    icon: User,
    title: "錯誤回饋及補救",
    description:
    "即時回饋學習錯誤，並提供補救方案，讓你能夠快速修正並持續進步。",
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
    <section id="features" ref={sectionRef} className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-white mb-12">
          我們的特色
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="feature-item p-6 bg-gray-700 rounded-lg shadow-md transition duration-300 ease-in-out transform opacity-0 hover:shadow-2xl"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <f.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-gray-300">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
