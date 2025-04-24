import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
}

export default function ActionButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
