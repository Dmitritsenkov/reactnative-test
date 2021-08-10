import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { firebase } from "../../firebase/config";

import { HomeScreen, ProfileScreen, ChatScreen } from "../../screens";

const Tab = createBottomTabNavigator();

export default function NavigationBarView(props) {
  const [loading, setLoading] = useState(true);

  const [isEditPressed, setIsEditPressed] = useState(false);
  const [isSavePressed, setIsSavePressed] = useState(false);

  const refreshNews = () => {
    setLoading(true);
    let docRef = firebase
      .firestore()
      .collection("news")
      .doc("news")
      .get()
      .then((document) => {
        let newsData = document.data().newsData;
        let newsDataArray = [];
        for (let i = newsData.length - 1; i >= 0; i--) {
          newsDataArray.push(newsData[i]);
        }
        setNews(newsDataArray);
        setLoading(false);
      });
  };

  const addNews = () => {
    return () => (
      <TouchableOpacity
        style={styles.addNewsButton}
        onPress={() =>
          props.navigation.navigate("Add an Update", {
            refreshNews: refreshNews,
          })
        }
      >
        <Text style={{ fontWeight: "bold" }}>Add News</Text>
      </TouchableOpacity>
    );
  };

  const editSwitcher = (saveOrEdit) => {
    if (saveOrEdit === "save") {
      setIsEditPressed(false);
      setIsSavePressed(true);
    }
    if (saveOrEdit === "edit") {
      setIsSavePressed(false);
      setIsEditPressed(true);
    }
  };

  const addEdit = () => {
    return () =>
      isEditPressed ? (
        <TouchableOpacity style={styles.editButton} onPress={() => editSwitcher("save")}>
          <Text style={{ fontWeight: "bold" }}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => editSwitcher("edit")}>
          <Text style={{ fontWeight: "bold" }}>Edit</Text>
        </TouchableOpacity>
      );
  };

  useLayoutEffect(() => {
    let routeName = getFocusedRouteNameFromRoute(props.route);
    let showAddNew = true;
    let showEditButton = false;

    switch (routeName) {
      case "Home":
        showAddNew = true;
        break;
      case "Profile":
        showAddNew = false;
        showEditButton = true;
        break;
      case "ChatScreen":
        showAddNew = false;
        break;
    }

    props.navigation.setOptions({
      headerRight: showAddNew ? addNews() : null,
    });

    if (showEditButton) {
      props.navigation.setOptions({
        headerRight: addEdit(),
      });
    }
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#1479F6",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 23,
        },
        headerStyle: { backgroundColor: "#FFF" },
        cardStyle: { backgroundColor: "#FFF" },
        animationEnabled: false,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={24} color="black" />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} news={props.news} />}
      </Tab.Screen>

      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      >
        {(props) => (
          <ProfileScreen isEditPressed={isEditPressed} isSavePressed={isSavePressed} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
