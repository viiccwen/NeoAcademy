import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

type FeatureItem = {
  title: string;
  description: string;
  image: string;
};

// todo: replace with actual photos
const features: FeatureItem[] = [
  {
    title: "Intuitive Design",
    description:
      "Our user-friendly interface ensures a smooth experience for all users, regardless of their technical expertise.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Powerful Analytics",
    description:
      "Gain valuable insights with our advanced analytics tools, helping you make data-driven decisions.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Seamless Integration",
    description:
      "Easily integrate with your existing tools and workflows for a streamlined experience.",
    image: "/placeholder.svg?height=200&width=300",
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
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="about-item bg-gray-700 border-gray-600 opacity-0"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <CardContent className="p-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 w-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
