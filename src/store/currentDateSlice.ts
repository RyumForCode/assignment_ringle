import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import utils from "../utils";

interface CurrentDate {
  currentDate: string;
}

const initialState: CurrentDate = {
  currentDate: utils.stringifyDateToISO(utils.getDateWithoutTime(new Date())),
};

const currentDateSlice = createSlice({
  name: "currentDate",
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<{ isoString: string }>) {
      state.currentDate = action.payload.isoString;
    },
  },
});

export const { setCurrentDate } = currentDateSlice.actions;
export default currentDateSlice.reducer;
