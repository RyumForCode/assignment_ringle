import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalObject {
  isOpen: boolean;
  position: { x: number; y: number };
  startAtIsoString: string | null;
  endToIsoString: string | null;
}

const initialState: ModalObject = {
  isOpen: false,
  position: { x: 0, y: 0 },
  startAtIsoString: null,
  endToIsoString: null,
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
  },
});

export const { openModal, closeModal, setStartAt, setEndTo } =
  modalSlice.actions;
export default modalSlice.reducer;
