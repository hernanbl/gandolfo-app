import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Página no encontrada
          </h2>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-black hover:bg-gray-800">
              Volver al inicio
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <img 
            src="/lovable-uploads/logo_gandolfo-bco.png" 
            alt="Gandolfo AI" 
            className="h-12 mx-auto opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
