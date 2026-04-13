import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import TrackSeriesPage from "./pages/TrackSeriesPage";
import SeriesVolumesPage from "./pages/SeriesVolumesPage";
import VolumeDetailPage from "./pages/VolumeDetailPage";
import VolumeReadView from "./pages/VolumeReadView";
import VolumeVisualView from "./pages/VolumeVisualView";
import {
  LegacyTopicRedirect,
  LegacyTopicReadRedirect,
  LegacyTopicVisualRedirect,
} from "./pages/LegacyTopicRedirects";
import NotFound from "./pages/NotFound.tsx";
import AcademyPlaybookPage from "./pages/AcademyPlaybookPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/playbook" element={<AcademyPlaybookPage />} />
          <Route path="/t/:trackSlug" element={<TrackSeriesPage />} />
          <Route path="/t/:trackSlug/:seriesSlug" element={<SeriesVolumesPage />} />
          <Route path="/t/:trackSlug/:seriesSlug/v/:volumeSlug" element={<VolumeDetailPage />} />
          <Route path="/t/:trackSlug/:seriesSlug/v/:volumeSlug/read" element={<VolumeReadView />} />
          <Route path="/t/:trackSlug/:seriesSlug/v/:volumeSlug/visual" element={<VolumeVisualView />} />
          <Route path="/topic/:id" element={<LegacyTopicRedirect />} />
          <Route path="/topic/:id/read" element={<LegacyTopicReadRedirect />} />
          <Route path="/topic/:id/visual" element={<LegacyTopicVisualRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
