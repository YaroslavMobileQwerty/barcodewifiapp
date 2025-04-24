import React from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";

interface Props {
  onStart: () => void;
}

export default function ScanSection({ onStart }: Props) {
  return (
    <View style={styles.container}>
      <ActionButton label="Scan QR Code" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: "center",
  },
});
