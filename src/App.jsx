import { useState } from 'react';
import { format, addMonths, subMonths, isSameMonth } from 'date-fns';
import { useCalendar } from './hooks/useCalendar';
import NotesSection from './components/NotesSection';
import CalendarGrid from './components/Calendargrid'; 
import CalendarImage from './components/CalendarImage';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

const SEASON_THEMES = {
  0: { name: 'Winter', img: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e', color: '#0ea5e9' },
  1: { name: 'Winter', img: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22', color: '#38bdf8' },
  2: { name: 'Spring', img: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7', color: '#10b981' },
  3: { name: 'Spring', img: 'https://images.unsplash.com/photo-1495539406979-bf61750d38ad', color: '#22c55e' },
  4: { name: 'Spring', img: 'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a', color: '#84cc16' },
  5: { name: 'Summer', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', color: '#f59e0b' },
  6: { name: 'Summer', img: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d', color: '#fbbf24' },
  7: { name: 'Summer', img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a', color: '#f97316' },
  8: { name: 'Autumn', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', color: '#d97706' },
  9: { name: 'Autumn', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773', color: '#c2410c' },
  10: { name: 'Autumn', img: 'https://images.unsplash.com/photo-1453791052107-5c843da62d97', color: '#9a3412' },
  11: { name: 'Winter', img: 'https://images.unsplash.com/photo-1477322524744-0eeadad6ad9b?auto=format&fit=crop&q=80&w=1200', color: '#1e40af' },
};

const today = new Date();

export default function App() {
  const { currentDate, daysInMonth, range, handleDateClick, setCurrentDate } = useCalendar();
  const [isDark, setIsDark] = useState(false);

  const activeDate = range.start ? format(range.start, 'yyyy-MM-dd') : null;
  const currentTheme = SEASON_THEMES[currentDate.getMonth()];

  return (
    // Reduced outer padding for more screen real estate
    <div className={`min-h-screen w-full flex items-center justify-center p-2 md:p-4 transition-colors duration-500 ${isDark ? 'bg-[#0c0a09]' : 'bg-[#f5f5f4]'}`}>
      
      {/* Container: Reduced max-width from 5xl/6xl to 4xl for a tighter look */}
      <div className={`relative w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden border transition-all duration-500 
        ${isDark ? 'bg-[#1c1917] border-stone-800' : 'bg-white border-stone-200'}`}>
        
        {/* Compact Progress Bar */}
        <div className="w-full h-1 bg-stone-100/10 relative z-50">
          <div 
            className="h-full transition-all duration-1000" 
            style={{ 
              width: `${isSameMonth(today, currentDate) ? (today.getDate() / 31) * 100 : (today > currentDate ? 100 : 0)}%`, 
              backgroundColor: currentTheme.color 
            }}
          />
        </div>

        {/* Small Navigation Controls */}
        <div className="absolute top-3 right-3 flex gap-1.5 z-40">
          {[
            { icon: <ChevronLeft size={16} />, action: () => setCurrentDate(subMonths(currentDate, 1)) },
            { icon: isDark ? <Sun size={16} /> : <Moon size={16} />, action: () => setIsDark(!isDark) },
            { icon: <ChevronRight size={16} />, action: () => setCurrentDate(addMonths(currentDate, 1)) }
          ].map((btn, i) => (
            <button 
              key={i}
              onClick={btn.action}
              className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full border border-white/10 transition-transform active:scale-90"
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Reduced Hero Height */}
        <div className="h-32 md:h-40 w-full relative">
          <CalendarImage imageUrl={currentTheme.img} monthName={format(currentDate, 'MMM yyyy')} />
        </div>

        {/* Optimized Content Grid: Changed ratio from 8:4 to 7:5 for better sidebar balance */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-t border-stone-100/10">
          
          {/* Calendar: Compact padding */}
          <div className="md:col-span-7 p-3 md:p-6 lg:p-8">
            <CalendarGrid 
              days={daysInMonth} 
              range={range} 
              onDateClick={handleDateClick} 
              currentMonth={currentDate}
              accentColor={currentTheme.color}
              isDark={isDark}
            />
          </div>

          {/* Sidebar: More vertical on desktop, slim on mobile */}
          <div className={`md:col-span-5 p-4 md:p-6 border-t md:border-t-0 md:border-l transition-colors
            ${isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50/50 border-stone-100'}`}>
            <NotesSection activeDate={activeDate} isDark={isDark} />
          </div>

        </div>
      </div>
    </div>
  );
}