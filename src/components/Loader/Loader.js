import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";

const Loader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator animating={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;
