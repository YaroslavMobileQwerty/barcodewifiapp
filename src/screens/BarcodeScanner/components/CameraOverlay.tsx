import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  onFlip: () => void;
  onCancel: () => void;
}

export default function CameraOverlay({ onFlip, onCancel }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onFlip} style={styles.button}>
        <Text style={styles.text}>Flip Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} style={styles.button}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00000088",
    padding: 8,
    borderRadius: 8,
  },
  button: {
    padding: 12,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});
