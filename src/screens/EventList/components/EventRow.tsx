import React from "react";
import { Pressable, Text, StyleSheet, Alert, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import type { Event } from "../../../store/eventsSlice";

interface Props {
  event: Event;
}

export default function EventRow({ event }: Props) {
  const handlePress = async () => {
    try {
      await Clipboard.setStringAsync(JSON.stringify(event));
      Alert.alert("Copied", "Event copied to clipboard");
    } catch {
      Alert.alert("Error", "Failed to copy event");
    }
  };

  return (
    <Pressable style={styles.row} onPress={handlePress}>
      <Text style={styles.type}>{event.type}</Text>
      <Text style={styles.timestamp}>
        {new Date(event.timestamp).toLocaleString()}
      </Text>
      {event.payload != null && (
        <View style={styles.payloadContainer}>
          <Text style={styles.payloadTitle}>Details:</Text>
          <Text style={styles.payloadText}>
            {JSON.stringify(event.payload, null, 2)}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  type: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timestamp: {
    color: "#666",
    marginTop: 4,
  },
  payloadContainer: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 4,
  },
  payloadTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  payloadText: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#333",
  },
});
