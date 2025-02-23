import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./pages/quiz";
import Create from "./pages/create";
import { ThemeProvider } from "./components/ui/theme-provider";
import Result from "./pages/result";
import Dashboard from "./pages/dashboard";
import Analytics from "./pages/analytics";
import { Auth } from "./pages/auth";
import ProtectedRoute from "./lib/ProtectedRoute";

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
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
