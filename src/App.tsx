import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Links from "./pages/Links";
import BlogPost from "./pages/BlogPost";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";
import { servicePages } from "./data/servicePages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/links" element={<Links />} />
          <Route path="/bio" element={<Links />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {servicePages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<ServicePage slug={page.slug} />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
