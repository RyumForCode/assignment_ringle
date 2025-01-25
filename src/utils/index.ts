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
  getCurrentWeek: (date: Date) => {
    const startDay = date.getDay();
    const week = [];

    const current = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - startDay
    );

    for (let day = 0; day < 7; day++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return week;
  },
  isSameDate: (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },
  getDateWithoutTime: (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },
  parseISOToDate: (isoString: string) => new Date(isoString),
  stringifyDateToISO: (date: Date) => date.toISOString(),
  generateUID: () => Math.random().toString(36).slice(2, 11),
  inputTimeParser: {
    dateInput: (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    timeInput: (date: Date) => {
      const hour = date.getHours();
      const meridiemFormat = Math.floor(hour / 12) ? "오후" : "오전";
      const formatedTime = String(hour % 12);
      const minute = String(date.getMinutes()).padStart(2, "0");

      return `${meridiemFormat} ${formatedTime}:${minute}`;
    },
  },
};

export default utils;
