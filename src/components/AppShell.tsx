import { TrackRail } from "@/components/TrackRail";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  activeTrackSlug?: string;
  /** Right padding on md+ when forest panel is shown */
  withForestGutter?: boolean;
  className?: string;
}

export function AppShell({ children, activeTrackSlug, withForestGutter = true, className }: AppShellProps) {
  return (
    <div className={cn("flex min-h-screen", className)}>
      <TrackRail activeTrackSlug={activeTrackSlug} />
      <div
        className={cn(
          "flex-1 min-w-0",
          withForestGutter && "md:pr-[14.75rem]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
