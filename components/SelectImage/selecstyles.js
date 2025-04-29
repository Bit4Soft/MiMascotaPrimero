import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  imageContainer: {
    width: 150,
    height: 155,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    resizeMode: "contain",
    borderStyle: "dotted",
    borderColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    alignItems: "center",
    padding: 20,
  },
  defaultImage: {
    marginTop: 20,
    width: 50,
    height: 50,
    marginBottom: 10,
    opacity: 0.7,
    resizeMode: "contain",
  },
  placeholderText: {
    marginTop: 10,
    color: "#666",
    textAlign: "center",
    fontSize: theme.fontSize.small,
  },
});
