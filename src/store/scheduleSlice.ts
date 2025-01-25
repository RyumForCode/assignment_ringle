import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import utils from "../utils";

export type ScheduleObject = {
  title: string;
  startAtIsoString: string;
  endToIsoString: string;
  uid: string;
};

interface ScheduleList {
  scheduleList: ScheduleObject[];
}

const initialState: ScheduleList = {
  scheduleList: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addNewSchedule(
      state,
      action: PayloadAction<{
        title: string;
        startAtIsoString: string;
        endToIsoString: string;
      }>
    ) {
      const payload = action.payload;
      if (payload.title.length === 0) {
        payload.title = "(제목 없음)";
      }
      const result = { ...payload, uid: utils.generateUID() };
      state.scheduleList.push(result);
    },
  },
});

export const { addNewSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
