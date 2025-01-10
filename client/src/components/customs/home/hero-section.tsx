import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { BackgroundEffect } from "./background-effect";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* background text */}
      <BackgroundEffect />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="z-50 text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 animate-fade-up animate-delay-100">
          NeoAcademy
        </h1>
        <p className="mt-3 max-w-md mx-auto text-md font-medium italic text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-fade-up animate-delay-300">
          "Personalized Learning, Powered by AI"
        </p>
        <div className="flex flex-col md:flex-row gap-2 mt-3 max-w-md mx-auto text-sm font-medium text-gray-400 sm:text-sm md:mt-5 md:text-lg md:max-w-xl animate-fade-up animate-delay-300">
          提供人們一個客製化學習路徑，結合
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            AI, Large Language Models.
          </p>
        </div>
        <div className="mt-10 animate-fade animate-delay-500">
          <Button
            asChild
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Link to="/login">
              開始使用 <LogIn className="w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};
