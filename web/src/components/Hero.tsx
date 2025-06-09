import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Star } from "lucide-react";
import BookingModal from "./BookingModal";
import WhatsAppChat from "./WhatsAppChat";

// Array de imágenes del directorio rollover (fuera del componente para evitar re-creación)
const rolloverImages = [
  '/rollover/joven-gandolfo.jpg', 
  '/rollover/joven-whapp.jpg',
  '/rollover/joven.jpg'
];

const Hero = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  
  // Force deploy trigger - Updated version with latest changes
  useEffect(() => {
    // Seleccionar imagen aleatoria al cargar el componente
    const randomIndex = Math.floor(Math.random() * rolloverImages.length);
    setCurrentImage(rolloverImages[randomIndex]);
    
    // Aplicar la clase animated después de que el resaltado haya comenzado
    const timer = setTimeout(() => {
      setIsHighlighted(true);
    }, 1100); // Este tiempo coincide con el transition-delay del CSS
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-28 pb-8 md:pt-20 md:pb-10 px-0 md:px-10 bg-[#eef1f0] relative z-0">
      <div className="container mx-auto px-1 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5 md:space-y-7 animate-fade-in">
            <div className="flex items-center space-x-2 px-4 py-2 w-fit shadow-sm" style={{backgroundColor: '#a8f4fe', borderRadius: '20px 0 20px 0'}}>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-300" />
              <span className="text-sm font-medium text-black">Atención al cliente reinventada</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-black">
              Tu restaurante, en modo <span className={`highlight-container highlighted ${isHighlighted ? 'animated' : ''}`}>inteligente</span>
            </h1>
            <p className="text-lg md:text-xl text-black/90 max-w-xl">
              Reservas automatizadas. Costos bajos. <strong>Mesas llenas.</strong>
              
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <Button 
                className="text-md bg-black hover:bg-gray-800 h-12 px-6 shadow-lg shadow-black/20 text-white"
                onClick={() => setBookingModalOpen(true)}
              >
                Empezar ahora
              </Button>
              <Button 
                variant="outline" 
                className="text-md h-12 px-6 flex items-center bg-black/10 text-black hover:bg-black/20 border-black/30"
                onClick={() => window.open('https://gandolfo.app/bot/6a117059-4c96-4e48-8fba-a59c71fd37cf', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ver demostración
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              {/* Se eliminó el mensaje "+100 restaurantes ya lo utilizan" */}
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[480px] lg:h-[640px] animate-fade-in">
            {/* Chat de WhatsApp animado */}
            <WhatsAppChat />
            
            {/* Elemento de fondo naranja existente */}
            <div className="absolute inset-x-[25%] top-[28%] bottom-[22%] bg-gradient-to-br from-white/5 to-orange-500/10 rounded-lg transform rotate-2 z-0"></div>
            
            {/* Elementos para el borde irregular pardo - Más grandes y rotados */}
            <div 
              className="absolute inset-0 m-auto w-[97%] h-[83%] bg-[#ffc69d] rounded-lg transform -rotate-2 z-[5]" // Aumentado tamaño y rotación
              style={{ backgroundColor: '#ffc69d' }} // Color pardo 1
            ></div>
             <div 
              className="absolute inset-0 m-auto w-[96.5%] h-[82.5%] bg-[#f8d7bf] rounded-lg transform rotate-1 z-[6]" // Aumentado tamaño y rotación
              style={{ backgroundColor: '#f8d7bf' }} // Color pardo 2
            ></div>

            {/* Contenedor de la imagen principal */}
            <div className="absolute inset-0 z-10 flex items-center justify-center"> 
              {currentImage && (
                <img 
                  src={currentImage} 
                  alt="Persona conversando para reservar una mesa con Gandolfo" 
                  // Mantenemos el tamaño y redondeo de la imagen
                  className="w-[95%] h-[81%] object-cover object-[center_55%] rounded-lg shadow-lg" 
                />
              )}
            </div>
            
            {/* Sección "Optimizado para WhatsApp y Meta" - Extendida al ancho de las imágenes */}
            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 z-20 w-[95%]">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 md:px-6 py-3 md:py-4 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-center space-x-4 md:space-x-6">
                  <span className="text-sm md:text-lg font-semibold text-gray-700">Optimizado para</span>
                  
                  {/* Logo de WhatsApp */}
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-8">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488" fill="#41b72c"/>
                    </svg>
                    <span className="text-sm md:text-lg font-semibold text-gray-800">WhatsApp</span>
                  </div>
                  
                  <div className="w-px h-5 md:h-6 bg-gray-300"></div>
                  
                  {/* Logo de Meta Business Partner */}
                  <div className="flex items-center">
                    <img 
                      src="/img/mbp-badge-light-backgrounds-hero-hmp.svg" 
                      alt="Meta Business Partner" 
                      className="h-8 md:h-12 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingModal open={bookingModalOpen} onOpenChange={setBookingModalOpen} />
    </section>
  );
};

export default Hero;