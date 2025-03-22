
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/30 rounded-full blur-xl"></div>
          <h1 className="text-9xl font-bold text-primary/80">404</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <a 
          href="/" 
          className="btn-primary inline-flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
