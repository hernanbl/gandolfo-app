// Crear un nuevo componente de calendario personalizado

import { useState } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  isSameMonth, 
  isSameDay, 
  addDays,
  getDay
} from "date-fns";
import { es } from "date-fns/locale";

interface CustomCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

export const CustomCalendar = ({ selectedDate, onChange }: CustomCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Función para navegar al mes anterior
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Función para navegar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Renderizar los días de la semana
  const renderDaysOfWeek = () => {
    const weekdayFormat = "EEEEEE";
    const days = [];
    const start = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      const day = addDays(start, i);
      days.push(
        <div key={i} className="text-center font-medium py-2 text-sm">
          {format(day, weekdayFormat, { locale: es }).toUpperCase()}
        </div>
      );
    }
    
    return <div className="grid grid-cols-7">{days}</div>;
  };
  
  // Renderizar las células del calendario
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    // Crear el array de días para el calendario
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayFormatted = format(day, 'd');
        const currentDay = new Date(day); // Crear una copia de la fecha para evitar problemas de referencia
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
        const isWeekend = getDay(day) === 0 || getDay(day) === 6; // 0 = domingo, 6 = sábado
        const isWeekday = !isWeekend;
        
        // Determinamos las clases CSS y estilos
        let cellClasses = "p-0 relative text-center";
        let dayClasses = "w-10 h-10 mx-auto flex items-center justify-center text-sm";
        
        if (!isCurrentMonth) {
          dayClasses += " text-gray-300";
        } else if (isPast) {
          dayClasses += " text-gray-400";
        } else if (isSelected) {
          // Día seleccionado: fondo negro y texto amarillo
          dayClasses += " bg-black text-[#fde68a] rounded-full font-medium";
          cellClasses = cellClasses.replace("weekday-highlight", ""); // Remover el highlight si está seleccionado
        } else if (isWeekday) {
          // Días laborables con círculo amarillo
          cellClasses += " weekday-highlight";
        }
        
        // Función de manejo de clics mejorada
        const handleDayClick = () => {
          if (!isPast && isCurrentMonth) {
            console.log("Día seleccionado:", format(currentDay, "yyyy-MM-dd"));
            onChange(currentDay);
          }
        };
        
        days.push(
          <div key={day.toString()} className={cellClasses}>
            <button 
              type="button"
              onClick={handleDayClick}
              disabled={isPast || !isCurrentMonth}
              className={dayClasses}
            >
              {dayFormatted}
            </button>
          </div>
        );
        
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={`row-${rows.length}`} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="mt-2">{rows}</div>;
  };
  
  return (
    <div className="custom-calendar p-2">
      {/* Encabezado del calendario */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          type="button"
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="font-medium">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </div>
        
        <button 
          onClick={nextMonth}
          type="button"
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Días de la semana */}
      {renderDaysOfWeek()}
      
      {/* Células del calendario */}
      {renderCells()}
      
      {/* Estilos para días laborables */}
      <style jsx>{`
        .weekday-highlight button {
          position: relative;
          z-index: 1;
        }
        
        .weekday-highlight button:not(:disabled)::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          background-color: #fde68a;
          border-radius: 50%;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default CustomCalendar;