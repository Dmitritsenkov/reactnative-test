import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    alignItems: "center",
  },
  aboutMeView: {
    width: "75%",
    marginTop: 30,
    marginBottom: 20,
  },
  aboutMeText: {
    color: "grey",
  },
  inputActive: {
    width: "75%",
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  inputDisabled: {
    width: "75%",
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    color: "grey",
  },
  logoutButton: {
    marginTop: 35,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "#ED4040",
    fontSize: 16,
  },
  saveButtonView: {
    marginTop: 15,
  },
  saveButtonTextActive: {
    fontSize: 16,
    color: "black",
  },
  saveButtonTextDisabled: {
    fontSize: 16,
    color: "grey",
  },
  aboutMeTextAreaView: {
    width: "75%",
    marginTop: 10,
  },
  aboutMeTextAreaLabelActive: {
    color: "black",
  },
  aboutMeTextAreaLabelDisabled: {
    color: "grey",
  },
  aboutMeTextAreaActive: {
    marginTop: 10,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 1,
    height: 100,
    padding: 5,
  },
  aboutMeTextAreaDisabled: {
    marginTop: 10,
    marginBottom: 20,
    borderColor: "grey",
    borderWidth: 1,
    height: 100,
    padding: 5,
  },
  avtarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadButtonText: {
    alignSelf: "center",
    marginTop: 5,
  },
});
