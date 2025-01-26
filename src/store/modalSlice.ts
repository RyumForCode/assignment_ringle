import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalObject {
  isOpen: boolean;
  position: { x: number; y: number };
  title: string;
  startAtIsoString: string | null;
  endToIsoString: string | null;
  isRepeat: boolean;
}

const initialState: ModalObject = {
  isOpen: false,
  position: { x: 0, y: 0 },
  title: "",
  startAtIsoString: null,
  endToIsoString: null,
  isRepeat: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        position: { x: number; y: number };
        startAtIsoString: string;
        endToIsoString: string;
      }>
    ) {
      state.position = action.payload.position;
      state.startAtIsoString = action.payload.startAtIsoString;
      state.endToIsoString = action.payload.endToIsoString;
      state.isOpen = true;
    },
    closeModal(state) {
      state.startAtIsoString = null;
      state.endToIsoString = null;
      state.title = "";
      state.isRepeat = false;
      state.isOpen = false;
    },
    setStartAt(
      state,
      action: PayloadAction<{
        isoString: string;
      }>
    ) {
      state.startAtIsoString = action.payload.isoString;
    },
    setEndTo(
      state,
      action: PayloadAction<{
        isoString: string;
      }>
    ) {
      state.endToIsoString = action.payload.isoString;
    },
    setIsRepeat(state, action: PayloadAction<boolean>) {
      state.isRepeat = action.payload;
    },
    setTitle(state, action: PayloadAction<{ title: string }>) {
      state.title = action.payload.title;
    },
  },
});

export const {
  openModal,
  closeModal,
  setStartAt,
  setEndTo,
  setTitle,
  setIsRepeat,
} = modalSlice.actions;
export default modalSlice.reducer;
