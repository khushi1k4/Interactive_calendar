import { useState, useEffect, useRef } from 'react';
import { getSpecialDay } from '../utils/holidayLogic';
import { getDailyQuote } from '../utils/quotes';

export default function NotesSection({ activeDate, isDark }) {
  const [noteText, setNoteText] = useState('');
  const textAreaRef = useRef(null);
  const dailyQuote = useRef(getDailyQuote());

  const specialDay = activeDate ? getSpecialDay(new Date(activeDate)) : null;

  useEffect(() => {
    if (activeDate) {
      try {
        const allNotes = JSON.parse(localStorage.getItem('calendar-daily-notes') || '{}');
        setNoteText(allNotes[activeDate] || '');
        setTimeout(() => textAreaRef.current?.focus(), 50);
      } catch (e) { setNoteText(''); }
    }
  }, [activeDate]);

  const handleSave = (e) => {
    const newText = e.target.value;
    setNoteText(newText);
    if (activeDate) {
      const allNotes = JSON.parse(localStorage.getItem('calendar-daily-notes') || '{}');
      allNotes[activeDate] = newText;
      localStorage.setItem('calendar-daily-notes', JSON.stringify(allNotes));
    }
  };

  return (
    <div className="flex flex-col h-full space-y-3 transition-all duration-500">
      
      {/* 💡 Ultra-Compact Quote Box */}
      {!activeDate && (
        <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all
          ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
          <span className="text-xs opacity-80">💡</span>
          <p className={`text-[11px] italic leading-tight truncate ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            "{dailyQuote.current}"
          </p>
        </div>
      )}

      {/* 🇮🇳 Compact Holiday Banner */}
      {specialDay && activeDate && (
        <div className={`p-2 rounded-lg border-l-4 flex items-center gap-3
          ${specialDay.type === 'national' 
            ? (isDark ? 'bg-green-900/20 border-green-500 text-green-300' : 'bg-green-50 border-green-600 text-green-800') 
            : (isDark ? 'bg-pink-900/20 border-pink-500 text-pink-300' : 'bg-pink-50 border-pink-500 text-pink-800')}`}
        >
          <span className="text-base">{specialDay.type === 'national' ? '🇮🇳' : '✨'}</span>
          <p className="text-[11px] font-bold">{specialDay.name}</p>
        </div>
      )}

      {/* 📝Notes Border Box */}
      <div className={`flex flex-col flex-1 rounded-2xl border overflow-hidden transition-all
        ${isDark ? 'border-stone-800 bg-stone-900/20' : 'border-stone-200 bg-white shadow-sm'}`}>
        
        {/* Header inside the box */}
        <div className={`px-4 py-2 border-b flex justify-between items-center
          ${isDark ? 'border-stone-800 bg-stone-800/40' : 'border-stone-100 bg-stone-50/50'}`}>
          <h3 className="text-[10px] font-black uppercase text-stone-400 tracking-widest">NOTE</h3>
          <p className={`text-[11px] font-bold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
            {activeDate ? new Date(activeDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : "Select a date"}
          </p>
        </div>

        {/* Textarea inside the box */}
        <textarea
          ref={textAreaRef}
          disabled={!activeDate}
          value={noteText}
          onChange={handleSave}
          placeholder={activeDate ? "Write your plans..." : ""}
          className={`flex-1 w-full p-4 outline-none resize-none text-xs leading-relaxed transition-all
            ${!activeDate 
              ? 'bg-transparent cursor-not-allowed opacity-30' 
              : (isDark ? 'bg-transparent text-stone-100' : 'bg-transparent text-stone-900')}
          `}
        />

        {/* Status bar inside the box */}
        <div className={`px-4 py-1.5 border-t flex justify-end
          ${isDark ? 'border-stone-800 bg-stone-800/20' : 'border-stone-50 bg-stone-50/30'}`}>
          {activeDate ? (
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-stone-500 uppercase font-bold tracking-tighter">Synced</span>
            </div>
          ) : (
            <span className="text-[9px] text-stone-400 uppercase font-bold tracking-tighter">Locked</span>
          )}
        </div>
      </div>
    </div>
  );
}