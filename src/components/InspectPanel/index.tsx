import { useDispatch, useSelector } from "react-redux";
import style_object from "./style";
import { closeModal } from "../../store/inspectSlice";
import { RootState } from "../../store/store";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useMemo, useRef } from "react";
import utils from "../../utils";
import { daysOfWeek } from "../../constants";
import { deleteSchedule } from "../../store/scheduleSlice";

export const InspectPanel = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, position, schedule } = useSelector(
    (state: RootState) => state.inspect
  );

  const dispatch = useDispatch();

  // When outside clicked, close the modal
  useOutsideClick(ref, () => closeModalAction(), isOpen);

  // Close modal and reset title input
  const closeModalAction = () => {
    dispatch(closeModal());
  };

  // onClick event for delete button
  const onClickDeleteSchedule = () => {
    if (!schedule) return;
    dispatch(deleteSchedule(schedule.uid));
    closeModalAction();
  };

  const textDisplayParser = useMemo(() => {
    if (schedule === null) return { title: "...", timeDisplay: "..." };
    const { title, startAtIsoString, endToIsoString } = schedule;
    const startAt = utils.parseISOToDate(startAtIsoString);
    const endTo = utils.parseISOToDate(endToIsoString);

    const timeRangeDisplay = utils.timeRangeDisplayParser(startAt, endTo);
    const monthDisplay = startAt.getMonth() + 1;
    const dateDisplay = startAt.getDate();
    const dayDisplay = daysOfWeek[startAt.getDay()] + "요일";

    return {
      title,
      timeDisplay: `${monthDisplay}월 ${dateDisplay}일 (${dayDisplay}) ⋅ ${timeRangeDisplay}`,
    };
  }, [schedule]);

  return (
    <div
      ref={ref}
      className={style_object.modal_wrapper_style}
      style={{
        top: position.y,
        left: position.x,
        display: isOpen ? "block" : "none",
      }}
    >
      <div className={style_object.top_bar_style}>
        <button
          className={style_object.delete_button_style}
          onClick={onClickDeleteSchedule}
        >
          <img src="/icons/delete.svg" alt="close icon" />
        </button>
        <button
          className={style_object.close_button_style}
          onClick={closeModalAction}
        >
          <img src="/icons/close.svg" alt="close icon" />
        </button>
      </div>
      <div className={style_object.information_div_style}>
        <div className={style_object.box_label_div_style} />
        <div className={style_object.text_container_style}>
          <div className={style_object.title_text_style}>
            {textDisplayParser?.title}
          </div>
          <p className={style_object.time_display_style}>
            {textDisplayParser?.timeDisplay}
          </p>
        </div>
      </div>
    </div>
  );
};
