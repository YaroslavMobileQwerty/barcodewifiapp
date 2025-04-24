import { configureStore } from "@reduxjs/toolkit";
import scannedCodesReducer from "./scannedCodesSlice";
import wifiReducer from "./wifiSlice";
import eventsReducer from "./eventsSlice";

export const store = configureStore({
  reducer: {
    scannedCodes: scannedCodesReducer,
    wifi: wifiReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
