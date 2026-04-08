import { format } from 'date-fns';

const SPECIAL_DAYS = {
  "01-26": { name: "Republic Day", type: "national" },
  "08-15": { name: "Independence Day", type: "national" },
  "10-02": { name: "Gandhi Jayanti", type: "national" },
  "02-14": { name: "Valentine's Day", type: "observance" },
  "11-14": { name: "Children's Day", type: "observance" },
};

export const getSpecialDay = (date) => {
  if (!date || isNaN(date.getTime())) return null;
  // This format must match the logic in the Grid
  return SPECIAL_DAYS[format(date, 'MM-dd')] || null;
};