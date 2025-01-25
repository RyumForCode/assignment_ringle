import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScheduleObject } from "./scheduleSlice";

interface CurrentDate {
  isOpen: boolean;
  position: { x: number; y: number };
  schedule: ScheduleObject | null;
}

const initialState: CurrentDate = {
  isOpen: false,
  position: { x: 0, y: 0 },
  schedule: null,
};

const inspectSlice = createSlice({
  name: "inspect",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        position: { x: number; y: number };
        schedule: ScheduleObject;
      }>
    ) {
      const { schedule, position } = action.payload;
      state.schedule = schedule;
      state.position = position;
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = inspectSlice.actions;
export default inspectSlice.reducer;
