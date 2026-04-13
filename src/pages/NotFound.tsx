import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BrandMark } from "@/components/BrandMark";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4 max-w-sm">
        <div className="flex justify-center mb-6">
          <BrandMark size={56} />
        </div>
        <h1 className="mb-2 text-4xl font-bold font-mono">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Page not found</p>
        <Link to="/" className="text-sm font-mono text-primary underline hover:text-primary/90">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
