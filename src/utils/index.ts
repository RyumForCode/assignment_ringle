import { ScheduleObject } from "../store/scheduleSlice";

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
  calculateCardPosition: (
    startAtIsoString: string,
    endToIsoString: string,
    standardDate: Date
  ) => {
    const startAt = utils.parseISOToDate(startAtIsoString);
    const endTo = utils.parseISOToDate(endToIsoString);
    const result = { topRatio: 0, bottomRatio: 0 };

    if (startAt.getTime() < standardDate.getTime()) {
      result.topRatio = 0;
    } else {
      const hour = startAt.getHours();
      const minute = startAt.getMinutes() + hour * 60;
      result.topRatio = minute / 1440;
    }
    if (
      endTo.getTime() >
      new Date(standardDate).setDate(standardDate.getDate() + 1)
    ) {
      result.bottomRatio = 1;
    } else {
      const hour = endTo.getHours();
      const minute = endTo.getMinutes() + hour * 60;
      result.bottomRatio = minute / 1440;
    }

    return result;
  },
  isToday: (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  },
  timeRangeDisplayParser: (startDate: Date, endDate: Date) => {
    const startTimeDisplay = utils.inputTimeParser.timeInput(startDate);
    const endTimeDisplay = utils.inputTimeParser.timeInput(endDate);

    if (startTimeDisplay.split(" ")[0] === endTimeDisplay.split(" ")[0]) {
      return `${startTimeDisplay}~${endTimeDisplay.split(" ")[1]}`;
    }
    return `${startTimeDisplay}~${endTimeDisplay}`;
  },
  repeatWeekChecker: (startAt: Date, endTo: Date, standardDate: Date) => {
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 604800000
    const startAtPattern = startAt.getTime() % oneWeekInMs;
    const endToPattern = endTo.getTime() % oneWeekInMs;
    const standardPattern = standardDate.getTime() % oneWeekInMs;

    return (
      standardPattern === startAtPattern || standardPattern === endToPattern
    );
  },
  repeatWeekDateConverter: (date: Date, schedule: ScheduleObject) => {
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 604800000
    const { startAtIsoString, endToIsoString } = schedule;
    const startAt = utils.parseISOToDate(startAtIsoString);
    const startDate = utils.getDateWithoutTime(startAt);
    const endTo = utils.parseISOToDate(endToIsoString);
    const endDate = utils.getDateWithoutTime(endTo);

    if (startDate.getTime() % oneWeekInMs === date.getTime() % oneWeekInMs) {
      const compensator =
        ((date.getTime() - startDate.getTime()) / oneWeekInMs) * 7;
      startAt.setDate(startAt.getDate() + compensator);
      endTo.setDate(endTo.getDate() + compensator);
    } else if (
      endDate.getTime() % oneWeekInMs ===
      date.getTime() % oneWeekInMs
    ) {
      const compensator =
        ((date.getTime() - endDate.getTime()) / oneWeekInMs) * 7;
      startAt.setDate(startAt.getDate() + compensator);
      endTo.setDate(endTo.getDate() + compensator);
    }

    return {
      ...schedule,
      startAtIsoString: utils.stringifyDateToISO(startAt),
      endToIsoString: utils.stringifyDateToISO(endTo),
    };
  },
};

export default utils;
