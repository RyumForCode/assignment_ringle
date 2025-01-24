const utils = {
  calendarGenerator: (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();
    const calendar = [];

    const current = new Date(year, month, 1 - startDay);

    for (let week = 0; week < 6; week++) {
      const weekBatch = [];
      for (let day = 0; day < 7; day++) {
        weekBatch.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      calendar.push(weekBatch);
    }

    return calendar;
  },
  isSameDate: (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },
  parseISOToDate: (isoString: string) => new Date(isoString),
  stringifyDateToISO: (date: Date) => date.toISOString(),
};

export default utils;
