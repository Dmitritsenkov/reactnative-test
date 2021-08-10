import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#FFF",
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 15,
  },
  avtarImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  postDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 5,
  },
  textView: {
    marginLeft: 10,
    marginBottom: 7,
  },
  avatarView: {},
  postDataView: {
    marginLeft: 10,
    marginRight: 10,
  },
  postImageView: {
    alignSelf: "center",
    width: "100%",
  },
  postImage: {
    height: 200,
    width: "100%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
