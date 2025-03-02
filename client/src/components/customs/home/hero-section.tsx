import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookMarked,
  Bot,
  Brain,
  Database,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { BackgroundEffect } from "./background-effect";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-4"
    >
      {/* background text */}
      <BackgroundEffect />

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          className="mb-6 sm:mb-8 flex sm:flex-row items-center justify-center gap-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-400" />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2 sm:mt-0 font-bold">
            NeoAcademy
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="mx-auto mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2">
            <span className="">提供人們一個客製化學習路徑，結合</span>
            <span className=" bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
              AI、Large Language Models
            </span>
          </div>
        </motion.p>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10 animate-fade animate-delay-500 flex items-center justify-center">
          <motion.button
            className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 px-4 py-2 sm:px-6 sm:py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/login">
              <span>開始使用</span>
            </Link>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 blur transition-opacity group-hover:opacity-50" />
          </motion.button>
        </div>

        {/* Feature highlights */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="hidden sm:flex sm:flex-col gap-3 w-full max-w-3xl">
            <div className="flex justify-center gap-3">
              <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/5 px-3 py-2 sm:px-4 text-white/70 backdrop-blur-sm text-sm sm:text-base">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                <span>個人化測驗產生</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/5 px-3 py-2 sm:px-4 text-white/70 backdrop-blur-sm text-sm sm:text-base">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span>智慧學習分析</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/5 px-3 py-2 sm:px-4 text-white/70 backdrop-blur-sm text-sm sm:text-base">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span>智慧教學助理</span>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/5 px-3 py-2 sm:px-4 text-white/70 backdrop-blur-sm text-sm sm:text-base">
                <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                <span>豐富學習資源</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/5 px-3 py-2 sm:px-4 text-white/70 backdrop-blur-sm text-sm sm:text-base">
                <Database className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span>大數據分析</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};
