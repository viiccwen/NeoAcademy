import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, LogIn } from "lucide-react";
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

        {/* Tagline */}
        <motion.h2
          className="mb-4 text-xl font-medium text-white/90 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          "Personalized Learning, Powered by AI"
        </motion.h2>

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
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};
