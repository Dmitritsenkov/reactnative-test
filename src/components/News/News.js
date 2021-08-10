import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Dimensions } from "react-native";

export default function News(props) {
  const [avatarUrl, setAvatarUrl] = useState();
  const [fullName, setFullName] = useState();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    // SETTING AVATAR URL
    if (!avatarUrl || !fullName) {
      const usersRef = firebase
        .firestore()
        .collection("users")
        .doc(props.newsData.userId);
      usersRef.get().then((document) => {
        let userData = document.data();
        setAvatarUrl(userData.avatarImageUrl);
        setFullName(userData.fullName);
      });
    }
  }, []);

  let postImage = null;
  if (props.newsData.postImageUrl) {
    postImage = (
      <View style={styles.postImageView}>
        <Image
          style={styles.postImage}
          source={{
            uri: props.newsData.postImageUrl,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.postDataContainer}>
        <View style={styles.avatarView}>
          <Image
            style={styles.avtarImage}
            source={{
              uri: avatarUrl,
            }}
          />
        </View>
        <View style={styles.postDataView}>
          <View>
            <Text style={{ fontSize: 16 }}>{fullName}</Text>
          </View>
          <View>
            <Text>{props.newsData.date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.textView}>
        <Text>{props.newsData.text}</Text>
      </View>
      {postImage}
    </View>
  );
}
