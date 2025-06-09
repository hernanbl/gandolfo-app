import React from 'react';
import { Button } from "@/components/ui/button";
import { ChartPie, ChartBar, Users, Calendar, Bell, Settings, ChartLine } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample reservation data by hour
const reservationData = [
  { hour: '10:00', reservations: 3 },
  { hour: '11:00', reservations: 5 },
  { hour: '12:00', reservations: 12 },
  { hour: '13:00', reservations: 18 },
  { hour: '14:00', reservations: 14 },
  { hour: '15:00', reservations: 8 },
  { hour: '16:00', reservations: 4 },
  { hour: '17:00', reservations: 7 },
  { hour: '18:00', reservations: 11 },
  { hour: '19:00', reservations: 16 },
  { hour: '20:00', reservations: 22 },
  { hour: '21:00', reservations: 19 },
  { hour: '22:00', reservations: 10 },
];

const AdminDashboard = () => {
  return (
    <section id="dashboard" className="py-20 px-0 md:px-10 bg-[#333333] text-white">
      <div className="container mx-auto px-1 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold">Dashboard de administrador potente</h2>
            <p className="text-lg text-gray-300">
            Visualización clara de la ocupación de mesas en tiempo real desde un único panel intuitivo y fácil de usar.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#41b72c] flex items-center justify-center text-white mr-4">
                  <ChartPie className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Estadísticas en tiempo real</h3>
                  <p className="text-gray-400">Visualiza el rendimiento de tu restaurante al instante</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#41b72c] flex items-center justify-center text-white mr-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Gestión de reservas</h3>
                  <p className="text-gray-400">Reservas firmes. Resultados reales.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#41b72c] flex items-center justify-center text-white mr-4">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Notificaciones personalizables</h3>
                  <p className="text-gray-400">Automatización que rinde.
                  </p>
                </div>
              </div>
            </div>
            <Button 
              className="bg-[#41b72c] hover:bg-[#41b72c]/90 text-white mt-4"
              onClick={() => window.open('https://gandolfo.app/admin/dashboard', '_blank')}
            >
              Ver demostración del dashboard
            </Button>
          </div>
          
          <div>
            <div className="bg-zinc-900 rounded-xl shadow-xl p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Panel de Control</h3>
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <Bell className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-400 mb-1">Reservas hoy</h4>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">24</span>
                    <span className="text-green-400 text-sm">+12%</span>
                  </div>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-400 mb-1">Mesas ocupadas</h4>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">18/30</span>
                    <span className="text-gray-400 text-sm">60%</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Reservas por hora</h4>
                  <div className="flex items-center space-x-2">
                    <ChartLine className="h-4 w-4 text-white" />
                    <span className="text-xs text-gray-400">Hoy</span>
                  </div>
                </div>
                <div className="h-40 bg-zinc-800 p-2 rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reservationData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="hour" stroke="#999999" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#999999" tick={{ fontSize: 10 }} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-black p-2 shadow-md">
                                <div className="text-xs font-bold text-white">{payload[0].payload.hour}</div>
                                <div className="text-xs text-white">
                                  {payload[0].value} reservas
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="reservations"
                        stroke="#41b72c"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Próximas reservas</h4>
                {[
                  { mesa: 3, personas: 4, hora: '20:30' },
                  { mesa: 5, personas: 2, hora: '21:00' },
                  { mesa: 8, personas: 6, hora: '21:15' }
                ].map((reserva, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#41b72c] mr-3 flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Mesa {reserva.mesa}</p>
                        <p className="text-xs text-gray-400">{reserva.personas} personas • {reserva.hora}</p>
                      </div>
                    </div>
                    <Button size="sm" className="text-xs h-8 bg-[#41b72c] hover:bg-[#41b72c]/90 text-white">Detalles</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
