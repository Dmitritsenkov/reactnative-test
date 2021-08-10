import "react-native-gesture-handler";
import React, { useEffect, useState, useContext } from "react";
import { Text, View, Modal, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  RegistrationScreen,
  ForgotPasswordScreen,
  ChatScreen,
  ConfirmCodeScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import { firebase } from "./src/firebase/config";
import Loader from "./src/components/Loader/Loader";
import UserDataContext from "./src/containers/UserDataContext/UserDataContext";
import AddUpdateModal from "./src/components/AddUpdateModal/AddUpdateModal";
import NavigationBarView from "./src/components/NavigationBarView/NavigationBarView";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [news, setNews] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loader loading={loading} />;
  }

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case "Home":
        return "News & Updates";
      case "ChatScreen":
        return "Messages";
      case "Profile":
        return "Profile";
    }
  }

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? (
          <>
            <Stack.Navigator>
              <Stack.Screen
                name="News & Updates"
                options={({ route }) => ({
                  headerTitle: getHeaderTitle(route),
                })}
              >
                {(props) => (
                  <NavigationBarView {...props} news={news} setUser={setUser} />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Add an Update"
                options={{
                  animationEnabled: true,
                }}
              >
                {(props) => <AddUpdateModal {...props} setNews={setNews} />}
              </Stack.Screen>
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator
              screenOptions={{
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 23,
                },
                headerStyle: { backgroundColor: "#FFF" },
                cardStyle: { backgroundColor: "#FFF" },
                animationEnabled: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </UserDataContext.Provider>
  );
}
