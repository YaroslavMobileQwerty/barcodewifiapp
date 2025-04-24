import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import "./src/firebase/config";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { useLogs } from "./src/hooks/useLogs";

function Root() {
  useEffect(() => {
    const { log } = useLogs();
    log("AppOpened");
  }, []);

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
