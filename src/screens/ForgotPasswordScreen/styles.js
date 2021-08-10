import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: "75%",
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  button: {
    backgroundColor: "#ED4040",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    height: 28,
    width: "75%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
  },
  errMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  },
});
