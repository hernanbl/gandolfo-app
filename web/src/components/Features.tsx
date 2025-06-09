import React from 'react';
import { MessageCircle, Calendar, ChartBar, Bell, Star, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Atención 24/7",
    description: "Nuestro asistente virtual atiende a tus clientes 24 horas al día, 7 días a la semana."
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Sistema de Reservas",
    description: "Gestiona las reservas de tu restaurante de forma automática y sin errores."
  },
  {
    icon: <ChartBar className="h-6 w-6" />,
    title: "Analíticas Detalladas",
    description: "Obtén información valiosa sobre tus clientes y su interacción con tu restaurante."
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Notificaciones",
    description: "Recibe alertas sobre nuevas reservas, cancelaciones o mensajes importantes."
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Personalización",
    description: "Adapta el asistente a la personalidad y estilo de tu restaurante."
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Fácil Configuración",
    description: "Configura el sistema en minutos, sin necesidad de conocimientos técnicos."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-1 md:px-10 bg-white">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Potencia tu restaurante con Gandolfo</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Diseñado para enamorar a tus clientes y mejorar tu rentabilidad.
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { 
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gradient-to-br from-white to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="h-12 w-12 rounded-lg bg-[#f97118] flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
