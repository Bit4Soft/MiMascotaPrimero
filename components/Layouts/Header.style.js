import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  header: {
    height: 70,
    width: "100%",
    backgroundColor: "#245e4b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: theme.fontSize.large,
    color: "white",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
