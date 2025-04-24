import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";

interface Props {
  onGrant: () => void;
}

export default function PermissionPrompt({ onGrant }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Camera permission is required</Text>
      <ActionButton label="Grant Permission" onPress={onGrant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    marginBottom: 16,
  },
});
