import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "../../firebase/config";
import UserDataContext from "../../containers/UserDataContext/UserDataContext";
import NavigationBarView from "../../components/NavigationBarView/NavigationBarView";
import News from "../../components/News/News";
import Loader from "../../components/Loader/Loader";
import AddUpdateModal from "../../components/AddUpdateModal/AddUpdateModal";

export default function HomeScreen(props) {
  const user = React.useContext(UserDataContext);

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState();
  const [refreshing, setRefreshing] = useState(false);

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

  const refreshNewsAfterScroll = () => {
    setRefreshing(true);
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
        setRefreshing(false);
      });
  };

  useEffect(() => {
    refreshNews();
  }, [props]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  let posts = news.map((el) => <News newsData={el} />);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshNewsAfterScroll()}
            />
          }
        >
          <View style={styles.postsView}>{posts}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
