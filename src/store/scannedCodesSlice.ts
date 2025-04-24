import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CodeItem {
  id: string;
  code: string;
  marked: boolean;
}

interface ScannedCodesState {
  items: CodeItem[];
}

const initialState: ScannedCodesState = { items: [] };

const scannedCodesSlice = createSlice({
  name: "scannedCodes",
  initialState,
  reducers: {
    addCode(state, action: PayloadAction<{ code: string }>) {
      const exists = state.items.find((i) => i.code === action.payload.code);
      if (!exists) {
        state.items.push({
          id: Date.now().toString(),
          code: action.payload.code,
          marked: false,
        });
      }
    },
    toggleMark(state, action: PayloadAction<{ id: string }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.marked = !item.marked;
    },
    removeCode(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    reorder(state, action: PayloadAction<{ items: CodeItem[] }>) {
      state.items = [...action.payload.items];
    },
    clearAll(state) {
      state.items = [];
    },
  },
});

export const { addCode, toggleMark, removeCode, reorder, clearAll } =
  scannedCodesSlice.actions;
export default scannedCodesSlice.reducer;
