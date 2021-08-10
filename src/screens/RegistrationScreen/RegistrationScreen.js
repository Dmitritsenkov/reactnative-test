import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
          myNews: [],
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let errorMessageView = null;

  if (errorMessage) {
    errorMessageView = (
      <View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Register as a new user</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="black"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="black"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter password"
        placeholderTextColor="black"
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize="none"
      />
      {errorMessageView}
      <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
        <Text style={styles.buttonTitle}>Register</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Login here
          </Text>
        </Text>
      </View>
    </View>
  );
}
