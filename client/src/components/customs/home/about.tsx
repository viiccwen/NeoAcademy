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

// todo: replace with actual photos
const features: FeatureItem[] = [
  {
    title: "AI-Powered Quiz Creation",
    description:
      "Generate quizzes tailored to your needs with AI. Simply provide a topic or learning objective, and let the model craft engaging questions for you.",
    image: CreateImg,
  },
  {
    title: "Smart Performance Analytics",
    description:
      "Track your quiz results and learning progress with in-depth analytics. Get personalized AI-generated feedback to improve your understanding.",
    image: AnalyticsImg,
  },
  {
    title: "Adaptive Quiz Experience",
    description:
      "Enjoy a dynamic quiz-taking experience with adaptive questions. Challenge yourself with questions that adjust to your skill level.",
    image: QuizImg,
  },
  {
    title: "Detailed Result Insights",
    description:
      "Receive an in-depth breakdown of your answers. Identify mistakes, review explanations, and get AI-driven suggestions for improvement.",
    image: ResultImg,
  },
  {
    title: "Comprehensive Learning Dashboard",
    description:
      "Manage all your quizzes and progress in one place. Access past attempts, monitor improvements, and plan your learning path efficiently.",
    image: DashboardImg,
  },
  {
    title: "Data-Driven Learning Strategies",
    description:
      "Visualize your learning trends with interactive charts. Use AI-recommended strategies to focus on areas that need improvement.",
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
          About Our Platform
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
