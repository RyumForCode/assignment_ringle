import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import utils from "../../utils";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import date_time_drop_down_style_object from "./style";

interface DropDownContent {
  title: string;
  date: Date;
}

export const DateTimeDropDown = ({
  objectArray,
  isOpen,
  setIsOpen,
  action,
}: {
  objectArray: DropDownContent[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: ActionCreatorWithPayload<{
    isoString: string;
  }>;
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLUListElement>(null);

  useOutsideClick(ref, () => setIsOpen(false), isOpen);

  // onClick event for list button
  const onClickListButton = (date: Date) => {
    dispatch(action({ isoString: utils.stringifyDateToISO(date) }));
    setIsOpen(false);
  };

  return (
    <ul
      ref={ref}
      className={date_time_drop_down_style_object.drop_down_container_style}
      style={{ display: isOpen ? "block" : "none" }}
    >
      {objectArray.map(({ title, date }) => (
        <li
          key={utils.stringifyDateToISO(date) + "dropdown"}
          className={date_time_drop_down_style_object.drop_down_list_style}
        >
          <button
            className={date_time_drop_down_style_object.list_button_style}
            onClick={() => onClickListButton(date)}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
};
