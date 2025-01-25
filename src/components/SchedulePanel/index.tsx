import { useMemo } from "react";
import { useSelector } from "react-redux";
import { daysOfWeek, timeTableRowTitle } from "../../constants";
import { RootState } from "../../store/store";
import utils from "../../utils";
import { WeekColumn } from "../WeekColumn";
import schedule_panel_style_object from "./style";

export const SchedulePanel = () => {
  const { currentDate } = useSelector((state: RootState) => state.currentDate);

  // Memo & Generate week array for display week
  const weekArray = useMemo(() => {
    const selectedDate = utils.parseISOToDate(currentDate);
    const result = utils.getCurrentWeek(selectedDate);
    return result;
  }, [currentDate]);

  return (
    <div className={schedule_panel_style_object.schedule_panel_wrapper_style}>
      <div className={schedule_panel_style_object.header_container_style}>
        <div className={schedule_panel_style_object.header_spacer_style} />
        <div className={schedule_panel_style_object.header_spacer_gap_style} />
        <div className={schedule_panel_style_object.header_day_container_style}>
          {weekArray.map((date: Date, index: number) => (
            <div
              className={schedule_panel_style_object.header_day_block_style}
              key={utils.stringifyDateToISO(date) + "week"}
            >
              <div
                className={schedule_panel_style_object.header_day_index_style}
              >
                {daysOfWeek[index]}
              </div>
              <h1
                className={
                  schedule_panel_style_object.header_date_display_style
                }
              >
                <button
                  className={
                    schedule_panel_style_object.header_date_button_style +
                    (utils.isToday(date)
                      ? schedule_panel_style_object.current_date_style
                      : schedule_panel_style_object.other_date_style)
                  }
                >
                  {date.getDate()}
                </button>
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className={schedule_panel_style_object.body_container_style}>
        <div className={schedule_panel_style_object.body_time_table_style}>
          {timeTableRowTitle.map((title: string) => (
            <div
              className={schedule_panel_style_object.body_time_table_box_style}
              key={title + "key"}
            >
              <span
                className={
                  schedule_panel_style_object.body_time_table_title_style
                }
              >
                {title}
              </span>
            </div>
          ))}
          <div className="relative h-[48px] " />
        </div>
        <div
          className={
            schedule_panel_style_object.body_week_array_container_style
          }
        >
          <div
            className={schedule_panel_style_object.body_week_array_spacer_style}
          />
          {weekArray.map((date: Date) => (
            <WeekColumn
              key={utils.stringifyDateToISO(date) + "week-col"}
              date={date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
