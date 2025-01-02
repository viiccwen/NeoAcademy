import { useEffect, useRef } from "react";
import { Zap, Bot, Shapes, User } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Optimized Learning Paths",
    description:
      "Save time with AI-driven learning pathways that adapt to your goals and optimize your success.",
  },
  {
    icon: Bot,
    title: "AI-Powered Personalization",
    description:
      "Harness the power of AI to deliver tailored content and recommendations for a truly individualized learning experience.",
  },
  {
    icon: Shapes,
    title: "Dynamic Knowledge Adaptation",
    description:
      "Seamlessly adjust to your skill level and pace, ensuring a smooth and effective learning journey.",
  },
  {
    icon: User,
    title: "Customizable Learning Experience",
    description:
      "Empower yourself with tools to personalize courses, track progress, and connect with a global community of learners.",
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
          Our Features
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
