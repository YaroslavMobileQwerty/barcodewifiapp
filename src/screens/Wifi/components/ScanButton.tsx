import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  scanning: boolean;
  onPress: () => void;
}

export default function ScanButton({ scanning, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={scanning}
    >
      <Text style={styles.text}>{scanning ? "Scanning..." : "Scan Wi-Fi"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  text: { color: "#fff", fontSize: 16 },
});
