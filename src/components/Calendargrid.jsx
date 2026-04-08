import { isSameDay, isWithinInterval, format, isSameMonth, isSunday } from 'date-fns';
import { getSpecialDay } from '../utils/holidayLogic';

export default function CalendarGrid({ days, range, onDateClick, currentMonth, accentColor, isDark }) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full select-none">
      {/* 1. Weekday Headers - Reduced margin-bottom */}
      <div className="grid grid-cols-7 mb-3">
        {daysOfWeek.map((day) => (
          <div 
            key={day} 
            className={`text-center text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-500
              ${day === 'Sun' ? (isDark ? 'text-red-400' : 'text-red-600') : 'text-stone-400'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 2. Compact Interactive Days Grid - Reduced gap-y */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day) => {
          const isSelected = (range.start && isSameDay(day, range.start)) || (range.end && isSameDay(day, range.end));
          const inRange = range.start && range.end && (
            isWithinInterval(day, { start: range.start, end: range.end }) ||
            isWithinInterval(day, { start: range.end, end: range.start })
          );
          
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSun = isSunday(day);
          const specialDay = getSpecialDay(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onDateClick(day)} 
              style={{ 
                backgroundColor: isSelected ? accentColor : (inRange ? `${accentColor}25` : 'transparent'),
                color: isSelected 
                  ? 'white' 
                  : (isSun || specialDay 
                      ? (isDark ? '#fb7185' : '#ef4444') 
                      : (isCurrentMonth ? (isDark ? '#fafaf9' : '#1c1917') : (isDark ? '#57534e' : '#d6d3d1')))
              }}
              // Height reduced to h-10 on mobile and h-12 on desktop
              className={`h-10 md:h-12 w-full flex flex-col items-center justify-center text-xs md:text-sm relative rounded-lg transition-all duration-500
                ${!isSelected && isCurrentMonth ? (isDark ? 'hover:bg-stone-800' : 'hover:bg-stone-100') : ''}
                ${!isCurrentMonth ? 'opacity-20 cursor-default' : 'cursor-pointer active:scale-90'}
              `}
            >
              {/* 🟢 Compact National Holiday Ring */}
              {specialDay?.type === 'national' && (
                <div className={`absolute inset-0 border-[1.5px] rounded-full m-0.5 opacity-60 z-0 pointer-events-none
                  ${isDark ? 'border-green-400' : 'border-green-500'}`} 
                />
              )}

              {/* 🌸 Compact Observance Dot */}
              {specialDay?.type === 'observance' && (
                <div className={`absolute top-1 right-1 w-1 h-1 rounded-full z-0 pointer-events-none
                  ${isDark ? 'bg-pink-400' : 'bg-pink-500'}`} 
                />
              )}

              {/* Day Number */}
              <span className={`z-10 font-bold ${isSun ? 'font-black' : ''}`}>
                {format(day, 'd')}
              </span>
              
              {/* Compact Selection Indicator */}
              {isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full z-10" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}