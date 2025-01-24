import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import utils from "../utils";

interface CurrentYearMonth {
  currentYearMonth: string;
}

const initialState: CurrentYearMonth = {
  currentYearMonth: utils.stringifyDateToISO(new Date()),
};

const moveStepCalendar = (currentISOString: string, delta: -1 | 1): string => {
  const currentYearMonth = utils.parseISOToDate(currentISOString);
  const newYear = currentYearMonth.getFullYear();
  const newMonth = currentYearMonth.getMonth() + delta;

  if (newMonth < 0) {
    const newYearMonth = new Date(newYear - 1, 11, 1);
    return utils.stringifyDateToISO(newYearMonth);
  } else if (newMonth > 11) {
    const newYearMonth = new Date(newYear + 1, 0, 1);
    return utils.stringifyDateToISO(newYearMonth);
  } else {
    const newYearMonth = new Date(newYear, newMonth, 1);
    return utils.stringifyDateToISO(newYearMonth);
  }
};

const currentYearMonthSlice = createSlice({
  name: "currentYearMonth",
  initialState,
  reducers: {
    setCurrentYearMonth(state, action: PayloadAction<{ isoString: string }>) {
      state.currentYearMonth = action.payload.isoString;
    },
    decrementCalendar(state) {
      state.currentYearMonth = moveStepCalendar(state.currentYearMonth, -1);
    },
    incrementCalendar(state) {
      state.currentYearMonth = moveStepCalendar(state.currentYearMonth, 1);
    },
  },
});

export const { setCurrentYearMonth, decrementCalendar, incrementCalendar } =
  currentYearMonthSlice.actions;
export default currentYearMonthSlice.reducer;
