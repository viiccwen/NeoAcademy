import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Login from "./pages/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./pages/quiz";
import Create from "./pages/create";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/quiz/:quizId/:index" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
