import { useMemo } from "react";
import { ScheduleObject } from "../../store/scheduleSlice";
import utils from "../../utils";
import style_object from "./style";

export const ScheduleCard = ({
  scheduleObject,
  date,
}: {
  scheduleObject: ScheduleObject;
  date: Date;
}) => {
  // Memoization card style
  const cardStyleObject = useMemo(() => {
    const { topRatio, bottomRatio } = utils.calculateCardPosition(
      scheduleObject.startAtIsoString,
      scheduleObject.endToIsoString,
      date
    );
    return {
      top: `calc(100%*${topRatio})`,
      height: `calc(100%*${bottomRatio - topRatio})`,
    };
  }, [scheduleObject, date]);

  // Display time range formatter
  const timeRangeDisplay = useMemo(() => {
    const { startAtIsoString, endToIsoString } = scheduleObject;
    const startAt = utils.parseISOToDate(startAtIsoString);
    const endTo = utils.parseISOToDate(endToIsoString);
    const startTimeDisplay = utils.inputTimeParser.timeInput(startAt);
    const endTimeDisplay = utils.inputTimeParser.timeInput(endTo);

    if (startTimeDisplay.split(" ")[0] === endTimeDisplay.split(" ")[0]) {
      return `${startTimeDisplay}~${endTimeDisplay.split(" ")[1]}`;
    }
    return `${startTimeDisplay}~${endTimeDisplay}`;
  }, [scheduleObject]);

  return (
    <button
      className={style_object.card_button_style}
      style={cardStyleObject}
      key={scheduleObject.uid}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span>{scheduleObject.title}</span>
      <span>{timeRangeDisplay}</span>
    </button>
  );
};
