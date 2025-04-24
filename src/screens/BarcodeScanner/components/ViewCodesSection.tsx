import React from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";

interface Props {
  count: number;
  onView: () => void;
}

export default function ViewCodesSection({ count, onView }: Props) {
  if (count === 0) return null;
  return (
    <View style={styles.container}>
      <ActionButton label="View Scanned Codes" onPress={onView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: "center",
  },
});
