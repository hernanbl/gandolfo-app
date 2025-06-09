import React from 'react';
import { MessageCircle, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6 px-1 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img src="lovable-uploads/logo_gandolfo-bco.png" alt="Gandolfo Logo" className="h-11 mb-4" />
            <p className="text-gray-300 mb-6">
              Potencia tu restaurante con inteligencia artificial para ofrecer un mejor servicio a tus clientes.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-3">
              {['Características', 'Precios', 'Soporte'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {['Nosotros', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-10 w-10 mr-3 mt-0.5" style={{color: '#41b72c'}} />
                <span className="text-gray-300">
                  Islandia 2397, Ingeniero Maschwitz, Buenos Aires, Argentina
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-6 w-6 mr-3 mt-0.5" style={{color: '#41b72c'}} />
                <span className="text-gray-300">
                  +549 (11) 6668-6255
                </span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="h-6 w-6 mr-3 mt-0.5" style={{color: '#41b72c'}} />
                <span className="text-gray-300">
                  info@gandolfo.app
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Gandolfo. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300">Términos</a>
            <a href="#" className="hover:text-slate-300">Privacidad</a>
            <a href="#" className="hover:text-slate-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
