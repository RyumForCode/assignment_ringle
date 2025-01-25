import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { RootState } from "../../store/store";
import utils from "../../utils";
import { ScheduleCard } from "../ScheduleCard";
import style_object from "./style";

export const WeekColumn = ({ date }: { date: Date }) => {
  const { scheduleList } = useSelector((state: RootState) => state.schedule);

  const dispatch = useDispatch();

  // Filtering schedules for current week array elements
  const filteredSchedules = scheduleList.filter(
    ({ startAtIsoString, endToIsoString }) => {
      const columnDate = utils.getDateWithoutTime(date).getTime();
      const startAtDate = utils
        .getDateWithoutTime(utils.parseISOToDate(startAtIsoString))
        .getTime();
      const endToDate = utils
        .getDateWithoutTime(utils.parseISOToDate(endToIsoString))
        .getTime();
      return columnDate === startAtDate || columnDate === endToDate;
    }
  );

  // onClickEvent for open modal and set initial state
  const onClickWeekColumn = (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date
  ) => {
    const elementTop = e.currentTarget.getBoundingClientRect().top;
    const relativeClickY = e.clientY - elementTop;
    const currentStep = Math.floor(relativeClickY / 24);

    const startAt = new Date(date);
    const endTo = new Date(date);
    startAt.setMinutes(currentStep * 30);
    endTo.setMinutes((currentStep + 2) * 30);

    const payload = {
      position: { x: e.pageX, y: e.pageY },
      startAtIsoString: utils.stringifyDateToISO(startAt),
      endToIsoString: utils.stringifyDateToISO(endTo),
    };

    dispatch(openModal(payload));
  };

  return (
    <div
      className={style_object.week_column_div_style}
      key={utils.stringifyDateToISO(date) + "column"}
      onClick={(e) => {
        onClickWeekColumn(e, date);
      }}
    >
      {filteredSchedules.map((scheduleObject) => (
        <ScheduleCard
          scheduleObject={scheduleObject}
          date={date}
          key={scheduleObject.uid + "schedule_card"}
        />
      ))}
    </div>
  );
};
