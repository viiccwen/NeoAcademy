import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ui/theme-provider";
import ProtectedRoute from "./lib/ProtectedRoute";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import Quiz from "./pages/quiz";
import Create from "./pages/create";
import Result from "./pages/result";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/analytics";
import RoadmapsPage from "./pages/roadmaps/roadmaps";
import RoadMap from "./pages/roadmaps/roadmap";
import { Auth } from "./pages/auth";
import CreateRoadmap from "./pages/roadmaps/create";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/:token" element={<Auth />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<Create />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/quiz/:quizId/:index" element={<Quiz />} />
              <Route path="/result/:quizId" element={<Result />} />
              <Route path="/roadmap/" element={<RoadmapsPage />} />
              <Route path="/roadmap/create" element={<CreateRoadmap />} />
              <Route path="/roadmap/:id" element={<RoadMap />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
