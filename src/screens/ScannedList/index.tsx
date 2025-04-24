import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ListRenderItemInfo } from "react-native";
import ReorderableList, {
  reorderItems,
  ReorderableListReorderEvent,
} from "react-native-reorderable-list";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  toggleMark,
  removeCode,
  reorder as saveOrder,
} from "../../store/scannedCodesSlice";
import CodeCard from "./components/CodeCard";
import { useAppSelector } from "../../store/hooks";
import { useLogs } from "../../hooks/useLogs";

interface CodeItem {
  id: string;
  code: string;
  marked: boolean;
}

export default function ScannedListScreen() {
  const reduxItems = useAppSelector((state) => state.scannedCodes.items);
  const dispatch = useDispatch<AppDispatch>();
  const { log } = useLogs();
  const [scannedCodesList, setScannedCodesList] = useState<CodeItem[]>([]);

  useEffect(() => {
    setScannedCodesList(reduxItems);
  }, [reduxItems]);

  const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
    setScannedCodesList((current) => {
      const next = reorderItems(current, from, to);
      dispatch(saveOrder({ items: next }));
      return next;
    });
  };

  const onToggle = (item: CodeItem) => {
    dispatch(toggleMark({ id: item.id }));

    log("ToggleBarcode", { itemId: item.id });
  };
  const onDelete = (item: CodeItem) => {
    dispatch(removeCode({ id: item.id }));

    log("DeleteBarcode", { itemId: item.id });
  };

  const renderItem = ({ item }: ListRenderItemInfo<CodeItem>) => (
    <CodeCard
      id={item.id}
      code={item.code}
      marked={item.marked}
      onToggle={() => onToggle(item)}
      onDelete={() => onDelete(item)}
    />
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
