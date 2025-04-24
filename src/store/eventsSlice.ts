import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: string;
  type: string;
  timestamp: string;
  payload?: any;
}

interface EventsState {
  items: Event[];
}
const initialState: EventsState = { items: [] };

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    logEvent(state, action: PayloadAction<Omit<Event, "id">>) {
      state.items.unshift({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    clearEvents(state) {
      state.items = [];
    },
  },
});

export const { logEvent, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
