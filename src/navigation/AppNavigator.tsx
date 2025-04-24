import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BarcodeScannerScreen from "../screens/BarcodeScanner";
import ScannedListScreen from "../screens/ScannedList";

export type RootStackParamList = {
  Scanner: undefined;
  List: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="Scanner">
        <Stack.Screen
          name="Scanner"
          component={BarcodeScannerScreen}
          options={{ title: "Barcode Scanner" }}
        />
        <Stack.Screen
          name="List"
          component={ScannedListScreen}
          options={{ title: "Scanned Codes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
