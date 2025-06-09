import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, ChevronDown, CheckCircle } from "lucide-react";
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

const ReservationDemo = () => {
  return (
    <section 
      id="reservations" 
      className="py-20 px-1 md:px-10 relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-[#eef1f0] z-0"
      ></div>
      <div 
        className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/50 to-transparent z-0"
      ></div>
      <div 
        className="absolute top-0 left-1/2 w-40 h-40 -translate-x-1/2 bg-white/30 opacity-[0.3] blur-3xl z-0"
      ></div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-200/20 to-transparent z-0"
      ></div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="order-2 lg:order-1">
              <motion.div 
                className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md mx-auto"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-black p-4"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-semibold text-white">Reserva una mesa</h3>
                  <p className="text-sm text-white">Completa el formulario para reservar</p>
                </motion.div>
                <div className="p-6 space-y-4">
                  {[
                    { label: "Fecha", icon: <Calendar className="h-5 w-5 text-black mr-2" />, value: "24 de abril, 2025" },
                    { label: "Hora", icon: <Clock className="h-5 w-5 text-black mr-2" />, value: "20:00" },
                    { label: "Personas", icon: <Users className="h-5 w-5 text-black mr-2" />, value: "4 personas" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-black">{item.label}</label>
                      <motion.div 
                        className="flex items-center border rounded-lg p-3"
                        whileHover={{ backgroundColor: "#f8f8f8" }}
                      >
                        {item.icon}
                        <span className="text-sm text-black">{item.value}</span>
                        <ChevronDown className="h-4 w-4 text-black ml-auto" />
                      </motion.div>
                    </motion.div>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-black hover:bg-gray-800 text-white mt-4">Confirmar reserva</Button>
                  </motion.div>
                  <p className="text-xs text-center text-black mt-4">
                    Solo de demostración. No se procesará ninguna reserva real.
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div className="order-1 lg:order-2 space-y-6">
              <h2 
                className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 via-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #3b82f6 0%, #22c55e 16%, #eab308 33%, #f97316 50%, #ef4444 66%, #ec4899 83%, #8b5cf6 100%)'
                }}
              >
                Cada reserva impulsa tu rentabilidad.
              </h2>
              <p className="text-lg text-black">
                Automatizá tus reservas. Integración total con tu web y WhatsApp.
              </p>
              <motion.ul 
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                {[
                  "Confirmaciones automáticas por WhatsApp",
                  "Recordatorios personalizados",
                  "Gestión de cancelaciones",
                  "Historial de clientes con preferencias y frecuencia de visitas",
                  "Integración con tu calendario"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    <motion.div 
                      className="h-6 w-6 rounded-full bg-black flex items-center justify-center text-white mr-3 mt-0.5"
                      whileHover={{ scale: 1.2, backgroundColor: "#333" }}
                    >
                      <CheckCircle className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-black">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReservationDemo;
