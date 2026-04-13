import { Navigate, useParams } from "react-router-dom";
import { LEGACY_TOPIC_ID } from "@/data/catalog";

const V1 = "/t/strategy-discovery/vision-north-star/v/volume-1";

/** Old `/topic/:id` → first volume of Vision & North Star series. */
export function LegacyTopicRedirect() {
  const { id } = useParams<{ id: string }>();
  if (id === LEGACY_TOPIC_ID) return <Navigate to={V1} replace />;
  return <Navigate to="/" replace />;
}

export function LegacyTopicReadRedirect() {
  const { id } = useParams<{ id: string }>();
  if (id === LEGACY_TOPIC_ID) return <Navigate to={`${V1}/read`} replace />;
  return <Navigate to="/" replace />;
}

export function LegacyTopicVisualRedirect() {
  const { id } = useParams<{ id: string }>();
  if (id === LEGACY_TOPIC_ID) return <Navigate to={`${V1}/visual`} replace />;
  return <Navigate to="/" replace />;
}
