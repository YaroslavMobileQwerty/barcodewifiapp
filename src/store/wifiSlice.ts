import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Network {
  SSID: string;
  level: number;
  BSSID: string;
}

interface WifiState {
  networks: Network[];
}

const initialState: WifiState = {
  networks: [],
};

const wifiSlice = createSlice({
  name: "wifi",
  initialState,
  reducers: {
    setNetworks(state, action: PayloadAction<Network[]>) {
      state.networks = action.payload;
    },
    clearNetworks(state) {
      state.networks = [];
    },
  },
});

export const { setNetworks, clearNetworks } = wifiSlice.actions;
export default wifiSlice.reducer;
