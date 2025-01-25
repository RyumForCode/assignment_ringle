import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import currentDateReducer from "./currentDateSlice";
import modalReducer from "./modalSlice";
import scheduleReducer from "./scheduleSlice";

export const store = configureStore({
  reducer: {
    currentDate: currentDateReducer,
    calendar: calendarReducer,
    modal: modalReducer,
    schedule: scheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
