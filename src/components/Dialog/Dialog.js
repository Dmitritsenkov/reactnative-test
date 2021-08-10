import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Dialog(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Name</Text>
      </View>
      <View>
        <Text>Last message</Text>
      </View>
    </View>
  );
}
