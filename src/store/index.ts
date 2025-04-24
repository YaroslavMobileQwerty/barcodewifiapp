import { configureStore } from "@reduxjs/toolkit";
import scannedCodesReducer from "./scannedCodesSlice";

export const store = configureStore({
  reducer: {
    scannedCodes: scannedCodesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
