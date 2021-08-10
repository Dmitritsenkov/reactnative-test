import React, { useState, useContext } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import UserDataContext from "../../containers/UserDataContext/UserDataContext";

export default function ConfirmCodeScreen({ route, navigation }) {
  const { setUser } = useContext(UserDataContext);

  const [code, setCode] = useState("");
  const { verificationId } = route.params;
  const { setCodeIsConfirmed } = route.params;
  const { nav } = route.params;

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      await firebase
        .auth()
        .signInWithCredential(credential)
        .then((response) => {
          const usersRef = firebase.firestore().collection("users");
          console.log("Phone authentication successful 👍");
          let uid = response.user.uid;
          let userData;
          usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
              userData = document.data();
              setCodeIsConfirmed(true);
              setUser(userData);
            })
            .then(() => {
              if (!userData) {
                const data = {
                  id: uid,
                  aboutMe: "",
                  avatarImageUrl: "",
                  email: "",
                  fullName: "",
                  myNews: [],
                };
                usersRef
                  .doc(uid)
                  .set(data)
                  .then(() => {
                    setCodeIsConfirmed(true);
                    setUser(uid);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter code (123456)"
        placeholderTextColor="black"
        onChangeText={(text) => setCode(text)}
        value={code}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={() => confirmCode()}>
        <Text style={styles.buttonTitle}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
