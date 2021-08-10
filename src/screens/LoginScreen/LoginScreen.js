import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onForgotPasswordPress = () => {
    navigation.navigate("ForgotPassword");
  };

  const sendVeryficationCode = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      console.log("Verification code has been sent to your phone.");
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  const onLoginPress = () => {
    if (phoneNumber) {
      sendVeryficationCode();
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                setEmailError("User does not exist anymore.");
                return;
              }
              const user = firestoreDocument.data();
            })
            .then(() => {
              navigation.navigate("Home", { user });
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  let errorMessageView = null;

  if (errorMessage) {
    errorMessageView = (
      <View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );
  }

  if (verificationId) {
    navigation.navigate("ConfirmCodeScreen", {
      verificationId: verificationId,
      nav: navigation,
    });
  }

  let firebaseRecaptchaVerifierModal = null;
  let phoneNumberInput = null;

  if (Platform.OS === "android" || Platform.OS === "ios") {
    firebaseRecaptchaVerifierModal = (
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
    );

    phoneNumberInput = (
      <React.Fragment>
        <View>
          <Text>or</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="black"
          onChangeText={(text) => setPhoneNumber("+1 650-555-3434")}
          value={phoneNumber}
          autoCapitalize="none"
        />
      </React.Fragment>
    );
  }

  return (
    <View style={styles.container}>
      {firebaseRecaptchaVerifierModal}
      <View style={styles.title}>
        <Text>Login</Text>
      </View>
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
      {phoneNumberInput}
      {errorMessageView}
      <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
        <Text style={styles.buttonTitle}>Login</Text>
      </TouchableOpacity>
      <View style={styles.forgetPasswordView}>
        <Text style={styles.footerText}>
          Forgot password?{" "}
          <Text onPress={onForgotPasswordPress} style={styles.footerLink}>
            Click here
          </Text>
        </Text>
      </View>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}
