import { StyleSheet } from "react-native";

export default StyleSheet.create({
  navigationBarView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderTopColor: "#B3B3B3",
    borderTopWidth: 1,
    borderColor: "rgba(245, 245, 245, .5)",
  },
  addNewsButton: {
    marginRight: 15,
  },
  editButton: {
    marginRight: 15,
  },
});
