import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import { servicePages } from "./data/servicePages";
import { installEmbeddedVideoTracking } from "./lib/analytics";

const Links = lazy(() => import("./pages/Links"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const GeoCoveragePage = lazy(() => import("./pages/GeoCoveragePage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const legacyRedirects = [
  { from: "/areas-de-atuacao", to: "/advogado-direito-militar/" },
  { from: "/areas-de-atuacao/direito-penal-militar", to: "/direito-penal-militar/" },
  { from: "/o-escritorio", to: "/bio/" },
];

const App = () => {
  useEffect(() => {
    installEmbeddedVideoTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/links" element={<Links />} />
              <Route path="/bio" element={<Links />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/atendimento-militar" element={<GeoCoveragePage />} />
              <Route path="/atendimento-militar/:stateSlug" element={<GeoCoveragePage />} />
              <Route path="/atendimento-militar/:stateSlug/:citySlug" element={<GeoCoveragePage />} />
              {legacyRedirects.map((route) => (
                <Route
                  key={route.from}
                  path={route.from}
                  element={<Navigate to={route.to} replace />}
                />
              ))}
              {servicePages.map((page) => (
                <Route key={page.slug} path={`/${page.slug}`} element={<ServicePage slug={page.slug} />} />
              ))}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
