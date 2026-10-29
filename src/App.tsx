import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index.tsx";
import Timetable from "./pages/Timetable.tsx";
import Projects from "./pages/Projects.tsx";
import JobBoard from "./pages/JobBoard.tsx";
import FormulaDirectory from "./pages/FormulaDirectory.tsx";
import ToolsHub from "./pages/ToolsHub.tsx";
import DownloadPage from "./pages/Download.tsx";
import NotFound from "./pages/NotFound.tsx";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const HashRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, "/");
      if (hash === "/download" || hash === "/desk") {
        navigate(hash, { replace: true });
      }
    }
  }, [navigate]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <HashRedirect />
        <div className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/formulas" element={<FormulaDirectory />} />
            <Route path="/tools" element={<ToolsHub />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/desk" element={<DownloadPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
