import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

interface Props {
  marked: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function HiddenActions({ marked, onToggle, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onToggle}>
        <Text style={styles.text}>{marked ? "Unmark" : "Mark"}</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.delete]} onPress={onDelete}>
        <Text style={styles.text}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc107",
  },
  delete: {
    backgroundColor: "#d11a2a",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
