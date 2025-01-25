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
    const { top, right } = ref.current.getBoundingClientRect();
    const payload = {
      schedule: scheduleObject,
      position: { x: right + 8, y: top },
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
