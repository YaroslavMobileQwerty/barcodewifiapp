import React from "react";
import { Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BarcodeScannerScreen from "../screens/BarcodeScanner";
import ScannedListScreen from "../screens/ScannedList";
import WifiScreen from "../screens/Wifi";
import EventListScreen from "../screens/EventList";

export type RootStackParamList = {
  Scanner: undefined;
  List: undefined;
  Wifi: undefined;
  EventList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Scanner"
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("EventList")}>
              <Text style={{ marginRight: 16 }}>📋</Text>
            </Pressable>
          ),
        })}
      >
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
        <Stack.Screen
          name="Wifi"
          component={WifiScreen}
          options={{ title: "Wi-Fi Networks" }}
        />
        <Stack.Screen
          name="EventList"
          component={EventListScreen}
          options={{ title: "EventList" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
