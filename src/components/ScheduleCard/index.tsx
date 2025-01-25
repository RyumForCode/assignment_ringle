import React, { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/inspectSlice";
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
  const ref = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();

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

    return utils.timeRangeDisplayParser(startAt, endTo);
  }, [scheduleObject]);

  // onClick event for schedule card to open inspect modal
  const onClickScheduleCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!ref.current) return;
    const { x, width } = ref.current.getBoundingClientRect();
    const cordinate = { x: 0, y: 0 };

    // To compensate modal position
    if (e.pageY + 137 + 32 > window.innerHeight) {
      cordinate.y = e.pageY - 137;
    } else {
      cordinate.y = e.pageY;
    }

    // To compensate modal position
    if (x + width + 452 + 32 > window.innerWidth) {
      cordinate.x = x - 4 - 452;
    } else {
      cordinate.x = x + width + 4;
    }

    const payload = {
      schedule: scheduleObject,
      position: cordinate,
    };
    dispatch(openModal(payload));
  };

  return (
    <button
      ref={ref}
      className={style_object.card_button_style}
      style={cardStyleObject}
      key={scheduleObject.uid}
      onClick={onClickScheduleCard}
    >
      <span className={style_object.title_span_style}>
        {scheduleObject.title !== "" ? scheduleObject.title : "(제목 없음)"}
      </span>
      <span>{timeRangeDisplay}</span>
    </button>
  );
};
