import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { useContext } from "react";
import styles from "./styles";
import UserDataContext from "../../containers/UserDataContext/UserDataContext";
import { firebase } from "../../firebase/config";
import NavigationBarView from "../../components/NavigationBarView/NavigationBarView";
import * as ImagePicker from "expo-image-picker";
import Loader from "../../components/Loader/Loader";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import AnimatedBottomSheet from "../../components/AnimatedBottomSheet/AnimatedBottomSheet";

export default function ProfileScreen(props) {
  const { user, setUser } = React.useContext(UserDataContext);

  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [aboutMeText, setAboutMeText] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState();
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [postImageUrl, setPostImageUrl] = useState();

  useEffect(() => {
    if (props.isEditPressed) {
      setIsFormDisabled(false);
    } else if (props.isSavePressed) {
      if (!isFormDisabled) {
        setIsFormDisabled(true);
        onSavePress();
      }
    }
  }, [props]);

  useEffect(() => {
    if (postImageUrl) {
      setAvatarLoading(true);
      onClickUpload();
    }
  }, [postImageUrl]);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users").doc(user.id);
    let userData;
    usersRef
      .get()
      .then((document) => {
        userData = document.data();
      })
      .then(() => {
        if (!avatarUrl) {
          setAvatarUrl(userData.avatarImageUrl);
        }
        if (!userData.avatarImageUrl) {
          let storageRef = firebase.storage().ref("Images/");
          storageRef
            .child("noAvatar.png")
            .getDownloadURL()
            .then(function (url) {
              usersRef.update({
                avatarImageUrl: url,
              });
              setAvatarUrl(url);
            });
        }
      });

    if (!name || !aboutMeText || !email) {
      setName(user.fullName);
      setEmail(user.email);
      setAboutMeText(user.aboutMe);
    }
  }, [props]);

  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {})
      .then(() => {
        setUser(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onEditPress = () => {
    setIsFormDisabled(!isFormDisabled);
  };

  const onSavePress = () => {
    let docRef = firebase.firestore().collection("users").doc(user.id);
    docRef
      .update({
        fullName: name,
        aboutMe: aboutMeText,
      })
      .then(() => {
        setName(name);
        setAboutMeText(aboutMeText);
        let newUser = {
          ...user,
          fullName: name,
          aboutMe: aboutMeText,
        };
        setUser(newUser);
      });
  };

  const onClickUpload = async () => {
    let usersRef = firebase.firestore().collection("users").doc(user.id);
    const response = await fetch(postImageUrl);
    const blob = await response.blob();
    let downloadURL;

    var ref = firebase
      .storage()
      .ref()
      .child("Users/" + user.id + "/avatar.jpg");
    ref.put(blob).then(function (snapshot) {
      snapshot.ref
        .getDownloadURL()
        .then(function (res) {
          downloadURL = res;
        })
        .then(() => {
          usersRef.update({
            avatarImageUrl: downloadURL,
          });
          setAvatarUrl(downloadURL);
          setAvatarLoading(false);
        });
    });
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  let avatar = (
    <Image
      style={styles.avtarImage}
      source={{
        uri: avatarUrl,
      }}
    />
  );

  if (avatarLoading) {
    avatar = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
        }}
      >
        <ActivityIndicator style={{}} animating={avatarLoading} />
      </View>
    );
  }

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <View>
          <TouchableOpacity activeOpacity={1} onPress={() => setShowActionSheet(true)}>
            {avatar}
            <Text style={styles.uploadButtonText}>Upload file</Text>
          </TouchableOpacity>
        </View>
        {user.aboutMe && isFormDisabled ? (
          <View style={styles.aboutMeView}>
            <Text style={styles.aboutMeText}>{aboutMeText}</Text>
          </View>
        ) : null}
        {user.aboutMe && !isFormDisabled ? (
          <View style={styles.aboutMeTextAreaView}>
            <TextInput
              label="About you"
              style={styles.aboutMeTextAreaActive}
              value={aboutMeText}
              placeholder="About me"
              multiline={true}
              onChangeText={(text) => setAboutMeText(text)}
            />
          </View>
        ) : null}
        <TextInput
          editable={!isFormDisabled}
          style={isFormDisabled ? styles.inputDisabled : styles.inputActive}
          placeholderTextColor="black"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          editable={false}
          style={styles.inputDisabled}
          placeholderTextColor="black"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {!user.aboutMe ? (
          <View style={styles.aboutMeTextAreaView}>
            <Text
              style={
                isFormDisabled
                  ? styles.aboutMeTextAreaLabelDisabled
                  : styles.aboutMeTextAreaLabelActive
              }
            >
              About you
            </Text>
            <TextInput
              editable={!isFormDisabled}
              label="About you"
              style={
                isFormDisabled
                  ? styles.aboutMeTextAreaDisabled
                  : styles.aboutMeTextAreaActive
              }
              multiline={true}
              onChangeText={(text) => setAboutMeText(text)}
            />
          </View>
        ) : null}

        <TouchableOpacity style={styles.logoutButton} onPress={() => onLogOutPress()}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
        <AnimatedBottomSheet
          showActionSheet={showActionSheet}
          setShowActionSheet={setShowActionSheet}
          setPostImageUrl={setPostImageUrl}
        />
      </View>
    </ActionSheetProvider>
  );
}
