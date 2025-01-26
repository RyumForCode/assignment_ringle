import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { setCurrentDate } from "../../store/currentDateSlice";
import {
  closeModal,
  setEndTo,
  setIsRepeat,
  setStartAt,
  setTitle,
} from "../../store/modalSlice";
import { addNewSchedule } from "../../store/scheduleSlice";
import { RootState } from "../../store/store";
import utils from "../../utils";
import { DateTimeDropDown } from "../DateTimeDropDown";
import style_object from "./style";
import { daysOfWeek } from "../../constants";

export const ScheduleCreateModal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    position,
    startAtIsoString,
    endToIsoString,
    title,
    isRepeat,
  } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

  const [startAtInputIsOpened, setStartAtInputIsOpened] =
    useState<boolean>(false); // startAt input dropdown state
  const [endToInputIsOpened, setEndToInputIsOpened] = useState<boolean>(false); // EndTo input dropdown state

  // startAt & endTo display value
  const startAt = useMemo(() => {
    if (startAtIsoString === null) return utils.getDateWithoutTime(new Date());
    return utils.parseISOToDate(startAtIsoString);
  }, [startAtIsoString]);

  const endTo = useMemo(() => {
    if (endToIsoString === null) return utils.getDateWithoutTime(new Date());
    return utils.parseISOToDate(endToIsoString);
  }, [endToIsoString]);

  // When outside clicked, close the modal
  useOutsideClick(containerRef, () => closeModalAction(), isOpen);

  // Time list generation for props dropdown element
  const dateTimeArrayGenerator = useCallback(
    (date: Date, isEndTo: boolean = false) => {
      const newArray = new Array(96).fill(null);
      const standardDate = new Date(
        isEndTo ? date : utils.getDateWithoutTime(date)
      );
      const result = newArray.map((_, index) => {
        const valueDate = new Date(standardDate);
        valueDate.setMinutes(valueDate.getMinutes() + index * 15);
        const title =
          utils.inputTimeParser.timeInput(valueDate) +
          (isEndTo ? ` (${(index * 15) / 60}시간)` : "");
        return { title, date: valueDate };
      });

      return result;
    },
    []
  );

  // Close modal and reset title input
  const closeModalAction = () => {
    dispatch(closeModal());
  };

  // onChange event for startAt date and endTo input
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value
      .split("-")
      .map((string) => Number(string));

    const newStartAt = new Date(
      year,
      month - 1,
      day,
      startAt.getHours(),
      startAt.getMinutes()
    );

    const newEndTo = new Date(
      year,
      month - 1,
      day,
      endTo.getHours(),
      endTo.getMinutes()
    );

    dispatch(setStartAt({ isoString: utils.stringifyDateToISO(newStartAt) }));
    dispatch(setEndTo({ isoString: utils.stringifyDateToISO(newEndTo) }));
    dispatch(
      setCurrentDate({ isoString: utils.stringifyDateToISO(newStartAt) })
    );
  };

  // onClick event for save button
  const onClickSaveButton = () => {
    if (!startAtIsoString || !endToIsoString) return;
    const payload = { title, startAtIsoString, endToIsoString, isRepeat };
    dispatch(addNewSchedule(payload));
    closeModalAction();
  };

  // Auto-focus on title input
  useEffect(() => {
    if (!titleRef.current || !isOpen) return;
    titleRef.current.focus();
  }, [isOpen]);

  // Close modal when press Escape key
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeModalAction();
    };

    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  });

  return (
    <div
      ref={containerRef}
      className={style_object.modal_wrapper_style}
      style={{
        top: position.y,
        left: position.x,
        display: isOpen ? "block" : "none",
      }}
    >
      <div className={style_object.top_bar_style}>
        <button
          className={style_object.close_button_style}
          onClick={closeModalAction}
        >
          <img src="/icons/close.svg" alt="close icon" />
        </button>
      </div>
      <div className={style_object.title_section_style}>
        <input
          ref={titleRef}
          className={style_object.title_input_style}
          type="text"
          placeholder="제목 추가"
          value={title}
          onChange={(e) => {
            dispatch(setTitle({ title: e.target.value }));
          }}
        />
      </div>
      <div className={style_object.select_type_section_style}>
        <button className={style_object.select_type_button_style}>
          이벤트
        </button>
      </div>
      <div className={style_object.date_params_section_style}>
        <div className={style_object.date_range_section_style}>
          <div className={style_object.date_range_icon_style}>
            <img src="/icons/schedule.svg" alt="schedule icon" />
          </div>
          <input
            className={style_object.date_range_input_style + "w-[137px] "}
            type="date"
            value={utils.inputTimeParser.dateInput(startAt)}
            onChange={onChangeDate}
          />
          <span className={style_object.date_range_input_wrapper_style}>
            <input
              className={style_object.date_range_input_style + "w-[100px] "}
              type="text"
              placeholder="hh:mm"
              value={utils.inputTimeParser.timeInput(startAt)}
              onFocus={() => setStartAtInputIsOpened(true)}
              onChange={() => {}}
            />
            <DateTimeDropDown
              objectArray={dateTimeArrayGenerator(startAt)}
              isOpen={startAtInputIsOpened}
              setIsOpen={setStartAtInputIsOpened}
              action={setStartAt}
            />
          </span>
          <span>-</span>
          <span className={style_object.date_range_input_wrapper_style}>
            <input
              className={style_object.date_range_input_style + "w-[100px] "}
              type="text"
              placeholder="hh:mm"
              value={utils.inputTimeParser.timeInput(endTo)}
              onFocus={() => setEndToInputIsOpened(true)}
              onChange={() => {}}
            />
            <DateTimeDropDown
              objectArray={dateTimeArrayGenerator(startAt, true)}
              isOpen={endToInputIsOpened}
              setIsOpen={setEndToInputIsOpened}
              action={setEndTo}
            />
          </span>
        </div>
        <div className={style_object.repeat_container_style}>
          <label className={style_object.repeat_week_label_style}>
            <input
              type="checkbox"
              className="hidden "
              checked={isRepeat}
              onChange={(e) => {
                dispatch(setIsRepeat(e.target.checked));
              }}
            />
            <img
              src={
                isRepeat
                  ? "/icons/checkbox_checked.svg"
                  : "/icons/checkbox_blank.svg"
              }
              alt={isRepeat ? "checkbox checked icon" : "checkbox blank icon"}
              width={24}
              height={24}
            />
            <span>
              {`매주 ${
                daysOfWeek[
                  utils.parseISOToDate(startAtIsoString as string).getDay()
                ]
              }요일 반복`}
            </span>
          </label>
        </div>
      </div>
      <div className={style_object.decision_section_style}>
        <button className={style_object.option_button_style}>
          옵션 더보기
        </button>
        <button
          className={style_object.save_button_style}
          onClick={onClickSaveButton}
        >
          저장
        </button>
      </div>
    </div>
  );
};
