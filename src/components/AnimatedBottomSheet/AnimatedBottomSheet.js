import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button, Platform } from "react-native";
import styles from "./styles";
import { useContext } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebase/config";
import UserDataContext from "../../containers/UserDataContext/UserDataContext";
import Constants from "expo-constants";

export default function AnimatedBottomSheet(props) {
  const user = React.useContext(UserDataContext);
  const { showActionSheetWithOptions } = useActionSheet();
  const [result, setResult] = useState();

  useEffect(() => {
    if (props.showActionSheet) {
      onOpenActionSheet();
    }
  }, [props]);

  const onClickUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      props.setPostImageUrl(result.uri);
    }
  };

  const pickFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        props.setPostImageUrl(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const onOpenActionSheet = () => {
    let options;
    if (Platform.OS === "android" || Platform.OS === "ios") {
      options = ["Upload from Photo Library", "Capture from Camera", "Cancel"];
    } else {
      options = ["Upload from Photo Library", "Cancel"];
    }
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          onClickUpload();
          props.setShowActionSheet(false);
        }
        if (buttonIndex === 1) {
          if (Platform.OS === "android" || Platform.OS === "ios") {
            pickFromCamera();
          }
          props.setShowActionSheet(false);
        }
        if (buttonIndex === 2) {
          props.setShowActionSheet(false);
        }
      }
    );
  };

  return (
    <View style={styles.bottomSheet}>
      <Text>{result}</Text>
    </View>
  );
}
