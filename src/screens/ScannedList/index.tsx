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

interface CodeItem {
  id: string;
  code: string;
  marked: boolean;
}

export default function ScannedListScreen() {
  const reduxItems = useSelector((s: RootState) => s.scannedCodes.items);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<CodeItem[]>([]);

  useEffect(() => {
    setData(reduxItems);
  }, [reduxItems]);

  const handleReorder = useCallback(
    ({ from, to }: ReorderableListReorderEvent) => {
      setData((current) => {
        const next = reorderItems(current, from, to);
        dispatch(saveOrder({ items: next }));
        return next;
      });
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CodeItem>) => (
      <CodeCard
        id={item.id}
        code={item.code}
        marked={item.marked}
        onToggle={() => dispatch(toggleMark({ id: item.id }))}
        onDelete={() => dispatch(removeCode({ id: item.id }))}
      />
    ),
    [dispatch]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ReorderableList
        data={data}
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
