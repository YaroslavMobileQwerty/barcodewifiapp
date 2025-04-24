import React, { useState, useCallback } from "react";
import { SafeAreaView, View, Alert, StyleSheet } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { addCode } from "../../store/scannedCodesSlice";
import type { AppDispatch, RootState } from "../../store";

import PermissionPrompt from "./components/PermissionPrompt";
import ScanSection from "./components/ScanSection";
import ViewCodesSection from "./components/ViewCodesSection";
import CameraOverlay from "./components/CameraOverlay";
import ActionButton from "./components/ActionButton";
import { logEvent } from "../../store/eventsSlice";

type ScannerNavProp = NativeStackNavigationProp<RootStackParamList, "Scanner">;

export default function BarcodeScannerScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<ScannerNavProp>();
  const dispatch = useDispatch<AppDispatch>();
  const codes = useSelector((state: RootState) => state.scannedCodes.items);

  const handleGrant = useCallback(async () => {
    const { granted } = await requestPermission();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Camera access is needed to scan QR codes",
        [
          { text: "Close", style: "cancel" },
          { text: "Retry", onPress: handleGrant },
        ]
      );
    }
  }, [requestPermission]);

  const handleStartScan = useCallback(() => {
    setScanned(false);
    setShowCamera(true);

    dispatch(
      logEvent({
        type: "StartBarcodeScanning",
        timestamp: new Date().toISOString(),
      })
    );
  }, []);

  const handleFlip = useCallback(() => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }, []);

  const handleBarCodeScanned = useCallback(
    ({ data }: { data: string }) => {
      setShowCamera(false);

      if (codes.some((c) => c.code === data)) {
        Alert.alert(
          "Duplicate QR Code",
          "This QR code has already been scanned",
          [
            { text: "Close", style: "cancel" },
            { text: "Scan Again", onPress: handleStartScan },
          ]
        );
        return;
      }
      setScanned(true);
      dispatch(addCode({ code: data }));
      dispatch(
        logEvent({
          type: "BarcodeScannedSuccessfully",
          timestamp: new Date().toISOString(),
        })
      );
      Alert.alert("Scan Successful", `Scanned code: ${data}`, [
        { text: "Close", style: "cancel" },
        { text: "Scan Again", onPress: handleStartScan },
        { text: "View Codes", onPress: () => navigation.navigate("List") },
      ]);
    },
    [codes, dispatch, handleStartScan, navigation]
  );

  const goToWifi = useCallback(() => {
    navigation.navigate("Wifi");
  }, []);

  if (!permission) return null;

  return (
    <SafeAreaView style={styles.container}>
      {!permission.granted && <PermissionPrompt onGrant={handleGrant} />}

      {permission.granted && !showCamera && (
        <View>
          <ScanSection onStart={handleStartScan} />
          <ViewCodesSection
            count={codes.length}
            onView={() => navigation.navigate("List")}
          />
        </View>
      )}
      {!showCamera && (
        <ActionButton label="Scanning for available Wi-Fi" onPress={goToWifi} />
      )}
      {showCamera && (
        <View style={styles.flex}>
          <CameraView
            style={styles.flex}
            facing={facing}
            active
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "code128"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <CameraOverlay
            onFlip={handleFlip}
            onCancel={() => setShowCamera(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  flex: { flex: 1 },
});
