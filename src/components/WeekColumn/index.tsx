import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { RootState } from "../../store/store";
import utils from "../../utils";
import { ScheduleCard } from "../ScheduleCard";
import style_object from "./style";
import { ScheduleObject } from "../../store/scheduleSlice";

export const WeekColumn = ({ date }: { date: Date }) => {
  const { scheduleList } = useSelector((state: RootState) => state.schedule);
  const { isOpen, startAtIsoString, endToIsoString, title, isRepeat } =
    useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  // Check existence status for each column
  const isCreating = useMemo(() => {
    if (!startAtIsoString || !endToIsoString) return;
    const startAt = utils
      .getDateWithoutTime(utils.parseISOToDate(startAtIsoString))
      .getTime();
    const endTo = utils
      .getDateWithoutTime(utils.parseISOToDate(endToIsoString))
      .getTime();
    const currentDate = date.getTime();
    return isOpen && currentDate >= startAt && currentDate <= endTo;
  }, [startAtIsoString, endToIsoString, isOpen, date]);

  // Temporary object for mock the currently creating schedule card
  const creatingSchedule: ScheduleObject = useMemo(() => {
    const isoDate = utils.stringifyDateToISO(new Date());
    if (!startAtIsoString || !endToIsoString)
      return {
        title: "",
        startAtIsoString: isoDate,
        endToIsoString: isoDate,
        uid: "no id",
        isRepeat,
      };
    return {
      title,
      startAtIsoString,
      endToIsoString,
      uid: utils.generateUID(),
      isRepeat,
    };
  }, [title, startAtIsoString, endToIsoString, isRepeat]);

  // Filtering schedules for current week array elements
  const filteredSchedules = scheduleList.filter(
    ({ startAtIsoString, endToIsoString, isRepeat }) => {
      const columnDate = utils.getDateWithoutTime(date);
      const startAtDate = utils.getDateWithoutTime(
        utils.parseISOToDate(startAtIsoString)
      );
      const endToDate = utils.getDateWithoutTime(
        utils.parseISOToDate(endToIsoString)
      );
      if (isRepeat) {
        return utils.repeatWeekChecker(startAtDate, endToDate, columnDate);
      } else {
        return (
          columnDate.getTime() >= startAtDate.getTime() &&
          columnDate.getTime() <= endToDate.getTime()
        );
      }
    }
  );

  // onClickEvent for open modal and set initial state
  const onClickWeekColumn = (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date
  ) => {
    const { x, width } = e.currentTarget.getBoundingClientRect();

    const elementTop = e.currentTarget.getBoundingClientRect().top;
    const relativeClickY = e.clientY - elementTop;
    const currentStep = Math.floor(relativeClickY / 24);

    const startAt = new Date(date);
    const endTo = new Date(date);
    startAt.setMinutes(currentStep * 30);
    endTo.setMinutes((currentStep + 2) * 30);

    const cordinate = { x: 0, y: 0 };

    // To compensate modal position
    if (e.pageY + 339 + 32 > window.innerHeight) {
      cordinate.y = e.pageY - 339;
    } else {
      cordinate.y = e.pageY;
    }

    // To compensate modal position
    if (x + width - 4 + 452 + 32 > window.innerWidth) {
      cordinate.x = x - 4 - 452;
    } else {
      cordinate.x = x + width - 4;
    }

    const payload = {
      position: cordinate,
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
      {/* Display of existing schedules */}
      {filteredSchedules.map((scheduleObject) => {
        if (scheduleObject.isRepeat) {
          const newScheduleObject = utils.repeatWeekDateConverter(
            date,
            scheduleObject
          );
          return (
            <ScheduleCard
              scheduleObject={newScheduleObject}
              date={date}
              key={
                newScheduleObject.uid +
                newScheduleObject.startAtIsoString +
                "schedule_card"
              }
            />
          );
        } else {
          return (
            <ScheduleCard
              scheduleObject={scheduleObject}
              date={date}
              key={
                scheduleObject.uid +
                scheduleObject.startAtIsoString +
                "schedule_card"
              }
            />
          );
        }
      })}
      {/* Display of the mock schedule (Currently creating) */}
      {isCreating && (
        <ScheduleCard
          scheduleObject={creatingSchedule}
          date={date}
          key={"creating_schedule_card"}
        />
      )}
    </div>
  );
};
