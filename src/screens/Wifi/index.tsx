import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";
import WifiManager from "react-native-wifi-reborn";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setNetworks, Network } from "../../store/wifiSlice";
import ScanButton from "./components/ScanButton";
import NetworkRow from "./components/NetworkRow";
import ConnectModal from "./components/ConnectModal";
import { logEvent } from "../../store/eventsSlice";

export default function WiFiScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector((s: RootState) => s.wifi.networks);
  const [scanning, setScanning] = useState(false);
  const [currentSSID, setCurrentSSID] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSSID, setSelectedSSID] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    WifiManager.getCurrentWifiSSID()
      .then((ssid) => setCurrentSSID(ssid))
      .catch(() => setCurrentSSID(null));
  }, []);

  const ensureLocationEnabled = useCallback(async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled && Platform.OS === "android") {
      Alert.alert(
        "Location Service Off",
        "Please enable location services to scan Wi-Fi",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () =>
              IntentLauncher.startActivityAsync(
                IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS
              ),
          },
        ]
      );
    }
    return enabled;
  }, []);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === "android") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    }
    return true;
  }, []);

  const scanWiFi = useCallback(async () => {
    if (!(await ensureLocationEnabled())) return;
    if (!(await requestPermission())) {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to scan Wi-Fi"
      );
      return;
    }
    setScanning(true);
    dispatch(
      logEvent({
        type: "WiFiScanningStarted",
        timestamp: new Date().toISOString(),
      })
    );
    try {
      const list = await WifiManager.loadWifiList();
      const parsed: Network[] =
        typeof list === "string" ? JSON.parse(list) : list;
      dispatch(
        setNetworks(
          parsed.map((n) => ({ SSID: n.SSID, BSSID: n.BSSID, level: n.level }))
        )
      );
      const ssid = await WifiManager.getCurrentWifiSSID();
      setCurrentSSID(ssid);
    } catch (e: any) {
      Alert.alert("Scan Failed", e.message ?? String(e));
    } finally {
      setScanning(false);
    }
  }, [dispatch, ensureLocationEnabled, requestPermission]);

  const promptForPassword = useCallback((ssid: string) => {
    setSelectedSSID(ssid);
    setPassword("");
    setModalVisible(true);
  }, []);

  const connect = useCallback(async () => {
    setModalVisible(false);
    try {
      const pwd = password.trim().length ? password : null;
      await WifiManager.connectToProtectedSSID(selectedSSID, pwd, false, false);
      Alert.alert("Connected", `Successfully connected to "${selectedSSID}"`);
      const ssid = await WifiManager.getCurrentWifiSSID();
      setCurrentSSID(ssid);
    } catch (e: any) {
      Alert.alert("Connection Failed", e.message ?? String(e));
    }
  }, [password, selectedSSID]);

  const disconnect = useCallback(async () => {
    try {
      await WifiManager.disconnect();
      Alert.alert("Disconnected", "You have been disconnected");
      setCurrentSSID(null);
    } catch (e: any) {
      Alert.alert("Disconnect Failed", e.message ?? String(e));
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScanButton scanning={scanning} onPress={scanWiFi} />

      <FlatList
        data={networks}
        keyExtractor={(item) => item.BSSID}
        ListEmptyComponent={<Text style={styles.empty}>No networks found</Text>}
        renderItem={({ item }) => (
          <NetworkRow
            item={item}
            isConnected={item.SSID === currentSSID}
            onConnect={promptForPassword}
            onDisconnect={disconnect}
          />
        )}
      />

      <ConnectModal
        visible={modalVisible}
        ssid={selectedSSID}
        password={password}
        onChangePassword={setPassword}
        onCancel={() => setModalVisible(false)}
        onConfirm={connect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
});
