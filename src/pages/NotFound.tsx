import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Oops! The page you're looking for doesn't exist. 
          Perhaps it was eaten by a hungry cake lover?
        </p>
        <Link to="/">
          <Button size="lg">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
