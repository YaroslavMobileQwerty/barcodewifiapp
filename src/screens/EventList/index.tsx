import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import EventRow from "./components/EventRow";

export default function EventListScreen() {
  const events = useSelector((s: RootState) => s.events.items);

  return (
    <SafeAreaView style={styles.safe}>
      {events.length === 0 ? (
        <Text style={styles.empty}>No events logged</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventRow event={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  empty: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#666",
  },
});
