// src/utils/quotes.js
export const QUOTES = [
  "The best way to predict the future is to create it.",
  "Don't count the days, make the days count."
];

export const getDailyQuote = () => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
};