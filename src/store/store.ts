import { configureStore } from "@reduxjs/toolkit";
import currentDateReducer from "./currentDateSlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
  reducer: { currentDate: currentDateReducer, calendar: calendarReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
