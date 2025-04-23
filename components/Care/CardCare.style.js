import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  card: {
    minWidth: 160,
    maxWidth: 160,
    maxHeight: 170,
    borderRadius: 10,
    borderColor: "#245e4b",
    borderWidth: 4,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: theme.fontSize.regular,
    fontFamily: theme.fontFamily.regular,
    fontWeight: "bold",
  },
});
