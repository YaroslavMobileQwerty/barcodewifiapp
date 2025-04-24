import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text } from "react-native";
import EventRow from "./components/EventRow";
import { useAppSelector } from "../../store/hooks";

export default function EventListScreen() {
  const events = useAppSelector((s) => s.events.items);

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
