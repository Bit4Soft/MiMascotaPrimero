import { StyleSheet } from "react-native";
import theme from "../../../constants/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff4ea",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: theme.fontSize.large,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  imageContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 80,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  backButton: {
    backgroundColor: "#245e4b",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
