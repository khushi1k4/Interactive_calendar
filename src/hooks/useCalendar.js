import { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isBefore, isSameDay } from 'date-fns';

export const useCalendar = () => {
  // Initialize to today so the NotesSection isn't disabled on load
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const handleDateClick = (date) => {
    // Clone the date to ensure React detects a state change
    const clickedDate = new Date(date);

    if (!range.start || (range.start && range.end)) {
      setRange({ start: clickedDate, end: null });
    } else if (isBefore(clickedDate, range.start)) {
      setRange({ start: clickedDate, end: null });
    } else if (isSameDay(clickedDate, range.start)) {
      // Deselect if clicking the same day
      setRange({ start: null, end: null });
    } else {
      setRange({ ...range, end: clickedDate });
    }
  };

  return { currentDate, daysInMonth, range, handleDateClick, setCurrentDate };
};