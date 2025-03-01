import { useFollowPointer } from "@/lib/utils";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";

const slogans = [
  "AI Learning",
  "Personalized Education, Smarter Future",
  "NeoAcademy",
  "NeoEducation | Adaptive Learning Paths for Every Student",
  "Personalized Learning, Powered by AI",
  "Unlock Your Potential with AI",
  "Learn Smarter, Not Harder",
  "Empowering Minds, One Algorithm at a Time",
  "Revolutionizing Education with AI",
  "Your Personalized Learning Journey Starts Here",
  "AI-Powered Learning, Tailored for You",
  "Innovate, Learn, Succeed",
  "Smart Learning for a Smarter Tomorrow",
  "Transforming Education with Intelligent Technology",
  "AI Meets Learning: The Future is Here",
  "Customized Learning Paths, Infinite Possibilities",
  "Adapt, Evolve, Achieve – NeoAcademy",
  "AI-Driven Learning, Human-Centered Growth",
  "Your Learning, Your Way",
  "Master Any Subject with AI Assistance",
  "Breaking Barriers in Education with AI",
  "Personalized AI Tutors, Just for You",
  "Education Beyond Limits",
  "AI-Powered Study Plans, Built for Success",
  "Learn at Your Own Pace with AI Guidance",
];

export const BackgroundEffect = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  const randomSlogans = useMemo(() => {
    return Array.from({ length: 25 }).map(() => {
      return slogans[Math.floor(Math.random() * slogans.length)];
    });
  }, []);
  return (
    <>
      <motion.div ref={ref} className="z-10 absolute w-40 h-40 bg-blue-500 opacity-30 rounded-full blur-3xl" style={{ x, y }} />;

      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-blue-800 opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />

      <div className="absolute inset-0">
          {randomSlogans.map((text, index) => (
            <div
              key={index}
              className="text-slate-800 absolute pointer-events-none text-flow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {text}
            </div>
          ))}
      </div>
    </>
  );
};
