import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { daysOfWeek } from "../../constants";
import { useSelectDate } from "../../hooks/useSelectDate";
import {
  decrementCalendar,
  incrementCalendar,
} from "../../store/calendarSlice";
import type { RootState } from "../../store/store";
import utils from "../../utils";
import style_object from "./style";
import { openModal } from "../../store/modalSlice";

export const DatePicker = () => {
  const { currentDate } = useSelector((state: RootState) => state.currentDate);
  const { currentYearMonth } = useSelector(
    (state: RootState) => state.calendar
  );

  const dispatch = useDispatch();

  // Custom hook for change calendar via date selection from calendar
  const selectDate = useSelectDate();

  // Memoization from calendarGenerator function
  const calendarArray = useMemo(() => {
    const yearMonth = utils.parseISOToDate(currentYearMonth);
    const result = utils.calendarGenerator(
      yearMonth.getFullYear(),
      yearMonth.getMonth()
    );
    return result;
  }, [currentYearMonth]);

  // Year and Month display string parser
  const yearMonthDisplayParser = useMemo(() => {
    const yearMonth = utils.parseISOToDate(currentYearMonth);
    return `${yearMonth.getFullYear()}년 ${yearMonth.getMonth() + 1}월`;
  }, [currentYearMonth]);

  // onClick event for date button elements
  const onClickDate = (date: Date) => {
    selectDate(date);
  };

  // onClick event for schedule creation button
  const onClickCreateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { x, y, width } = e.currentTarget.getBoundingClientRect();
    const endTo = utils.parseISOToDate(currentDate);
    endTo.setMinutes(endTo.getMinutes() + 60);
    const endToIsoString = utils.stringifyDateToISO(endTo);
    dispatch(
      openModal({
        position: { x: x + width + 8, y },
        startAtIsoString: currentDate,
        endToIsoString,
      })
    );
  };

  return (
    <div className={style_object.wrapper_style}>
      <div className={style_object.add_schedule_section_style}>
        <button
          className={style_object.add_schedule_button_style}
          onClick={onClickCreateButton}
        >
          <img src="/icons/add.svg" alt="add icon" /> 만들기
          <img src="/icons/arrow_drop_down.svg" alt="arrow drop down icon" />
        </button>
      </div>
      <div className={style_object.calendar_section_style}>
        <div className={style_object.calendar_box_style}>
          <div className={style_object.calendar_header_style}>
            <span className={style_object.current_month_style}>
              {yearMonthDisplayParser}
            </span>
            <span>
              <button
                className={
                  style_object.navigation_arrow_button_style + "mr-[5px] "
                }
                onClick={() => dispatch(decrementCalendar())}
              >
                <img
                  src="/icons/chevron_left.svg"
                  alt="chevron left icon"
                  width={18}
                  height={18}
                />
              </button>
              <button
                className={style_object.navigation_arrow_button_style}
                onClick={() => dispatch(incrementCalendar())}
              >
                <img
                  src="/icons/chevron_right.svg"
                  alt="chevron right icon"
                  width={18}
                  height={18}
                />
              </button>
            </span>
          </div>
          <table className={style_object.calendar_display_table_style}>
            <thead>
              <tr>
                {daysOfWeek.map((day: string, index: number) => (
                  <th
                    className={style_object.table_header_day_style}
                    key={day + index}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarArray.map((week: Date[], weekIndex: number) => {
                const trKey = week[0].getTime() + "-from-" + weekIndex;
                const weekElements = week.map((date: Date) => {
                  const isCurrent = utils.isSameDate(
                    date,
                    utils.parseISOToDate(currentDate)
                  );
                  const isToday = utils.isSameDate(
                    date,
                    utils.getDateWithoutTime(new Date())
                  );

                  return (
                    <td
                      key={date.getTime()}
                      className={style_object.table_body_row_style}
                    >
                      <button
                        className={
                          style_object.table_body_common_date_style +
                          (isToday
                            ? style_object.table_body_today_date_style
                            : isCurrent
                            ? style_object.table_body_current_date_style
                            : style_object.table_body_none_date_style)
                        }
                        onClick={() => onClickDate(date)}
                      >
                        {date.getDate()}
                      </button>
                    </td>
                  );
                });
                return <tr key={trKey}>{weekElements}</tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
