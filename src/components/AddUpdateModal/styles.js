import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
    padding: 0,
    backgroundColor: "#FFF",
  },
  updateTextInput: {
    position: "absolute",
    top: 25,
    width: "90%",
    padding: 10,
    height: 150,
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: "top",
  },
  submitBtnDisabled: {
    justifyContent: "center",
    width: "100%",
    height: 35,
    alignItems: "center",
    backgroundColor: "#F6BEBE",
  },
  submitBtnActive: {
    justifyContent: "center",
    width: "100%",
    height: 35,
    alignItems: "center",
    backgroundColor: "#ED4040",
  },
  addMediaView: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  addPhotoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  postImageView: {},
  postImage: {},
});
