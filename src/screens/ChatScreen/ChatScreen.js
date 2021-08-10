import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import NavigationBarView from "../../components/NavigationBarView/NavigationBarView";
import styles from "./styles";
import Dialog from "../../components/Dialog/Dialog";

export default function ChatScreen(props) {
  return (
    <View style={styles.container}>
      <Dialog />
    </View>
  );
}
