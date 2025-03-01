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
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* background text */}
      <BackgroundEffect />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-2 text-6xl font-bold text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="h-12 w-12 text-blue-400" />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            NeoAcademy
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          提供人們一個客製化學習路徑，結合{" "}
          <span className="text-blue-400">AI</span>、
          <span className="text-purple-400">Large Language Models</span>。
        </motion.p>

        <div className="mt-10 animate-fade animate-delay-500 flex items-center justify-center gap-4">
          {/* CTA Button */}
          <motion.button
            className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 px-6 py-3 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/login">
              <span>開始使用</span>
            </Link>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 blur transition-opacity group-hover:opacity-50" />
          </motion.button>
        </div>

        {/* Feature highlights */}
        <motion.div
          className="mt-16 flex flex-col flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex gap-8">
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-white/70 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span>個人化測驗產生</span>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-white/70 backdrop-blur-sm">
              <Brain className="h-5 w-5 text-blue-400" />
              <span>智慧學習分析</span>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-white/70 backdrop-blur-sm">
              <Bot className="h-5 w-5 text-blue-400" />
              <span>智慧教學助理</span>
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-white/70 backdrop-blur-sm">
              <BookMarked className="h-5 w-5 text-purple-400" />
              <span>豐富學習資源</span>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-white/70 backdrop-blur-sm">
              <Database className="h-5 w-5 text-blue-400" />
              <span>大數據分析</span>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};
