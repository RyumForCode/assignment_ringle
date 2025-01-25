import { useSelector } from "react-redux";
import { useSelectDate } from "../../hooks/useSelectDate";
import { RootState } from "../../store/store";
import utils from "../../utils";
import header_style_object from "./style";

export const Header = () => {
  const { currentDate } = useSelector((state: RootState) => state.currentDate);

  // Custom hook for change calendar via date selection from calendar
  const selectDate = useSelectDate();

  // Event handler for date button elements
  const onClickTodayButton = () => {
    selectDate(new Date());
  };

  // onClick event for arrow button to move next/prev week
  const onClickMoveWeek = (delta: -1 | 1) => {
    const date = utils.parseISOToDate(currentDate);
    date.setDate(date.getDate() + 7 * delta);
    selectDate(date);
  };

  return (
    <header className={header_style_object.wrapper_style}>
      <div className={header_style_object.logo_container_style}>
        <button className={header_style_object.menu_icon_button}>
          <img src="/icons/menu.svg" alt="menu icon" width={24} height={24} />
        </button>
        <img
          className={header_style_object.google_calendar_logo_icon_style}
          src="/icons/google_calendar.png"
          alt="google calendar icon"
        />
        <span className={header_style_object.google_calendar_logo_type_style}>
          Calendar
        </span>
      </div>
      <div className={header_style_object.interaction_container_style}>
        <div className={header_style_object.date_controller_style}>
          <button
            className={header_style_object.today_finder_button_style}
            onClick={onClickTodayButton}
          >
            오늘
          </button>
          <button
            className={header_style_object.unit_change_arrow_icon_style}
            onClick={() => onClickMoveWeek(-1)}
          >
            <img src="/icons/chevron_left.svg" alt="chevron left icon" />
          </button>
          <button
            className={header_style_object.unit_change_arrow_icon_style}
            onClick={() => onClickMoveWeek(1)}
          >
            <img src="/icons/chevron_right.svg" alt="chevron right icon" />
          </button>
          <span className={header_style_object.current_date_indicator_style}>
            2025년 1월
          </span>
        </div>
        <div className={header_style_object.function_controller_style}>
          <button className={header_style_object.function_icon_style}>
            <img src="/icons/search.svg" alt="search icon" />
          </button>
          <button
            className={header_style_object.function_icon_style + "mx-[2px] "}
          >
            <img src="/icons/help.svg" alt="help icon" />
          </button>
          <button
            className={header_style_object.function_icon_style + "ml-[4px] "}
          >
            <img src="/icons/settings.svg" alt="settings icon" />
          </button>
          <button
            className={header_style_object.calendar_unit_dropdown_button_style}
          >
            주
            <img
              className="pl-[8px]"
              src="/icons/arrow_drop_down.svg"
              alt="arrow drop down icon"
            />
          </button>
          <fieldset
            className={header_style_object.view_selection_fieldset_style}
          >
            <label
              className={header_style_object.view_selection_input_left_style}
            >
              <input type="radio" name="job_selection" hidden />
              <img src="/icons/date_range.svg" alt="date range icon" />
            </label>
            <div className={header_style_object.view_selection_divider_style} />
            <label
              className={header_style_object.view_selection_input_right_style}
            >
              <input type="radio" name="job_selection" hidden />
              <img src="/icons/task_alt.svg" alt="task alt icon" />
            </label>
          </fieldset>
        </div>
      </div>
      <div className={header_style_object.user_info_container_style}>
        <button className={header_style_object.other_service_menu_icon_style}>
          <img src="/icons/apps.svg" alt="apps icon" />
        </button>
        <button className={header_style_object.profile_button_style}>AB</button>
      </div>
    </header>
  );
};
