import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  headerWrapper: {
    backgroundColor: "#245e4b",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#fff4ea",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D2951",
  },
  statusBar: {
    backgroundColor: "#245e4b",
    barStyle: "light-content",
  },
});
