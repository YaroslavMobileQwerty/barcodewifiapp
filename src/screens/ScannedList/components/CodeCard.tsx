import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useReorderableDrag } from "react-native-reorderable-list";
import HiddenActions from "./HiddenActions";

interface Props {
  id: string;
  code: string;
  marked: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const CodeCard = ({ id, code, marked, onToggle, onDelete }: Props) => {
  const drag = useReorderableDrag();

  return (
    <Swipeable
      renderRightActions={() => (
        <HiddenActions
          marked={marked}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}
      overshootRight={false}
    >
      <Pressable style={styles.card} onLongPress={drag}>
        <Text style={styles.text}>
          {code}
          {marked && " 📌"}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

export default CodeCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
});
