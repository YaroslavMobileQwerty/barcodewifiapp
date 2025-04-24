import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Network } from "../../../store/wifiSlice";

interface Props {
  item: Network;
  isConnected: boolean;
  onConnect: (ssid: string) => void;
  onDisconnect: () => void;
}

export default function NetworkRow({
  item,
  isConnected,
  onConnect,
  onDisconnect,
}: Props) {
  return (
    <View style={styles.row}>
      <Text style={[styles.ssid, isConnected && styles.connected]}>
        {item.SSID}
        {isConnected ? " (connected)" : ""}
      </Text>
      <Text style={styles.rssi}>{item.level} dBm</Text>
      <TouchableOpacity
        style={isConnected ? styles.disconnect : styles.connect}
        onPress={() => (isConnected ? onDisconnect() : onConnect(item.SSID))}
      >
        <Text style={styles.buttonText}>
          {isConnected ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  ssid: { flex: 1, fontSize: 16 },
  connected: { color: "#4CAF50", fontWeight: "bold" },
  rssi: { width: 60, textAlign: "right" },
  connect: {
    marginLeft: 12,
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  disconnect: {
    marginLeft: 12,
    backgroundColor: "#d11a2a",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: { color: "#fff" },
});
