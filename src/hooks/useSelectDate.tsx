import { useDispatch } from "react-redux";
import { setCurrentYearMonth } from "../store/calendarSlice";
import { setCurrentDate } from "../store/currentDateSlice";
import utils from "../utils";

export const useSelectDate = () => {
  const dispatch = useDispatch();

  return (date: Date) => {
    const selectedDate = utils.getDateWithoutTime(date);
    const payload = {
      isoString: utils.stringifyDateToISO(selectedDate),
    };
    dispatch(setCurrentDate(payload));
    dispatch(setCurrentYearMonth(payload));
  };
};
