import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet, ListRenderItemInfo } from "react-native";
import ReorderableList, {
  reorderItems,
  ReorderableListReorderEvent,
} from "react-native-reorderable-list";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  toggleMark,
  removeCode,
  reorder as saveOrder,
} from "../../store/scannedCodesSlice";
import CodeCard from "./components/CodeCard";
import { logEvent } from "../../store/eventsSlice";

interface CodeItem {
  id: string;
  code: string;
  marked: boolean;
}

export default function ScannedListScreen() {
  const reduxItems = useSelector((s: RootState) => s.scannedCodes.items);
  const dispatch = useDispatch<AppDispatch>();
  const [scannedCodesList, setScannedCodesList] = useState<CodeItem[]>([]);

  useEffect(() => {
    setScannedCodesList(reduxItems);
  }, [reduxItems]);

  const handleReorder = useCallback(
    ({ from, to }: ReorderableListReorderEvent) => {
      setScannedCodesList((current) => {
        const next = reorderItems(current, from, to);
        dispatch(saveOrder({ items: next }));
        return next;
      });
    },
    [dispatch]
  );

  const onToggle = useCallback(
    (item: CodeItem) => {
      dispatch(toggleMark({ id: item.id }));
      dispatch(
        logEvent({
          type: "ToggleBarcode",
          timestamp: new Date().toISOString(),
          payload: {
            itemId: item.id,
          },
        })
      );
    },
    [dispatch]
  );
  const onDelete = useCallback(
    (item: CodeItem) => {
      dispatch(removeCode({ id: item.id }));
      dispatch(
        logEvent({
          type: "DeleteBarcode",
          timestamp: new Date().toISOString(),
          payload: {
            itemId: item.id,
          },
        })
      );
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CodeItem>) => (
      <CodeCard
        id={item.id}
        code={item.code}
        marked={item.marked}
        onToggle={() => onToggle(item)}
        onDelete={() => onDelete(item)}
      />
    ),
    [dispatch]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ReorderableList
        data={scannedCodesList}
        onReorder={handleReorder}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        autoscrollThreshold={0.1}
        autoscrollSpeedScale={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
