import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const passwordReset = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage("The password has been sent");
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  let errMessageView = null;
  let successMessageView = null;

  if (errMessage) {
    successMessageView = null;
    errMessageView = (
      <View>
        <Text style={styles.errMessage}>{errMessage}</Text>
      </View>
    );
  }
  if (successMessage) {
    errMessageView = null;
    successMessageView = (
      <View>
        <Text style={styles.successMessage}>{successMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="black"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      {errMessageView}
      {successMessageView}
      <TouchableOpacity style={styles.button} onPress={() => passwordReset(email)}>
        <Text style={styles.buttonTitle}>Send password</Text>
      </TouchableOpacity>
    </View>
  );
}
