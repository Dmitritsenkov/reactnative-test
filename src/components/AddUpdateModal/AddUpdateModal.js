import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import {
  ActionSheetIOS,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import UserDataContext from "../../containers/UserDataContext/UserDataContext";
import { firebase } from "../../firebase/config";
import AnimatedBottomSheet from "../AnimatedBottomSheet/AnimatedBottomSheet";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Dimensions } from "react-native";

const AddUpdateModal = (props) => {
  const { user } = React.useContext(UserDataContext);
  const [postText, setPostText] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={{ fontWeight: "bold" }}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerLeft: null,
    });
  });

  useEffect(() => {}, [postImageUrl]);

  const formatDate = () => {
    let today = new Date();
    let date =
      ("0" + today.getDate()).slice(-2) +
      "." +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "." +
      today.getFullYear();
    let time =
      ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);
    let dateTime = date + " " + time;
    return dateTime;
  };

  const submitPost = async () => {
    let dateTime = formatDate();
    let usersRef = firebase.firestore().collection("users").doc(user.id);
    let newsRef = firebase.firestore().collection("news").doc("news");
    let newMyNewsArray = [];

    if (postImageUrl) {
      let uniqId = "id" + new Date().getTime();
      let downloadURL = "";

      const response = await fetch(postImageUrl);
      const blob = await response.blob();

      var ref = firebase
        .storage()
        .ref()
        .child("Users/" + user.id + "/postImages/" + uniqId);
      ref
        .put(blob)
        .then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (res) {
            downloadURL = res;
          });
        })
        .then(() => {
          usersRef
            .get()
            .then((document) => {
              let currentMyNewsArray = document.data().myNews;
              newMyNewsArray = [...currentMyNewsArray];
              newMyNewsArray.push({
                date: dateTime,
                fullName: user.fullName,
                text: postText,
                userId: user.id,
                postImageUrl: downloadURL,
              });
            })
            .then(() => {
              usersRef.update({
                myNews: newMyNewsArray,
              });
            })
            .then(() => {
              newsRef.update({
                newsData: firebase.firestore.FieldValue.arrayUnion({
                  date: dateTime,
                  fullName: user.fullName,
                  text: postText,
                  userId: user.id,
                  postImageUrl: downloadURL,
                }),
              });
            })
            .then(() => {
              props.setNews(newMyNewsArray);
              props.navigation.goBack();
            });
        });
    } else {
      usersRef
        .get()
        .then((document) => {
          let currentMyNewsArray = document.data().myNews;
          newMyNewsArray = [...currentMyNewsArray];
          newMyNewsArray.push({
            date: dateTime,
            fullName: user.fullName,
            text: postText,
            userId: user.id,
            postImageUrl: null,
          });
        })
        .then(() => {
          usersRef.update({
            myNews: newMyNewsArray,
          });
          newsRef.update({
            newsData: firebase.firestore.FieldValue.arrayUnion({
              date: dateTime,
              fullName: user.fullName,
              text: postText,
              userId: user.id,
              postImageUrl: null,
            }),
          });
        })
        .then(() => {
          props.setNews(newMyNewsArray);
          props.navigation.goBack();
        });
    }
  };

  let postImageView = null;
  if (postImageUrl) {
    postImageView = (
      <View style={styles.postImageView}>
        <Image
          style={{ width: windowWidth - 40, height: 200 }}
          source={{
            uri: postImageUrl,
          }}
        />
      </View>
    );
  }

  return (
    <ActionSheetProvider>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset="-200"
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.updateTextInput}
            placeholder="Type your update here"
            multiline={true}
            onChangeText={(text) => setPostText(text)}
            value={postText}
          />
          {postImageView}
          <View style={{ width: "100%" }}>
            <View style={styles.addMediaView}>
              <TouchableOpacity
                onPress={() => setShowActionSheet(true)}
                style={styles.addPhotoView}
              >
                <Entypo name="image" size={24} color="black" />
                <Text style={{ marginLeft: 5 }}>Add Photo</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={submitPost}
              style={[postText ? styles.submitBtnActive : styles.submitBtnDisabled]}
            >
              <Text style={{ color: "#FFF", fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AnimatedBottomSheet
          showActionSheet={showActionSheet}
          setShowActionSheet={setShowActionSheet}
          setPostImageUrl={setPostImageUrl}
        />
      </KeyboardAvoidingView>
    </ActionSheetProvider>
  );
};

export default AddUpdateModal;
