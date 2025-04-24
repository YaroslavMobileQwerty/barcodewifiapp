import React from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface Props {
  visible: boolean;
  ssid: string;
  password: string;
  onChangePassword: (text: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConnectModal({
  visible,
  ssid,
  password,
  onChangePassword,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Connect to {ssid}</Text>
          <TextInput
            style={styles.input}
            placeholder="Password (leave empty if open)"
            secureTextEntry
            value={password}
            onChangeText={onChangePassword}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    padding: 32,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  title: { fontSize: 18, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: Platform.OS === "ios" ? 12 : 8,
    marginBottom: 16,
  },
  buttons: { flexDirection: "row", justifyContent: "flex-end" },
  button: { marginHorizontal: 12 },
  buttonText: { fontSize: 16, color: "#2196F3" },
});
