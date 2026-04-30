import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "./components/site/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth";
import CrmLayout from "./components/crm/CrmLayout";
import Dashboard from "./pages/crm/Dashboard";
import Leads from "./pages/crm/Leads";
import LeadDetail from "./pages/crm/LeadDetail";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/crm" element={<CrmLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="leads/:id" element={<LeadDetail />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
