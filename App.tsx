import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import "./src/firebase/config";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { logEvent } from "./src/store/eventsSlice";

function Root() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      logEvent({ type: "AppOpened", timestamp: new Date().toISOString() })
    );
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
