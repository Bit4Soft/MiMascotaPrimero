import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  headerWrapper: {
    backgroundColor: "#245e4b",
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#fff4ea",
    gap: 10,
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
  continueButton: {
    backgroundColor: "#245e4b",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  titleText: {
    fontSize: theme.fontSize.xLarge,
  },
  vaccinesText: {
    fontSize: theme.fontSize.large,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  textLoading: {
    paddingTop: 20,
    fontSize: theme.fontSize.xLarge,
    color: "#1D2951",
    textAlign: "center",
  },
  contentLoading: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff4ea",
    gap: 1,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff4ea",
  },

  fullWidthButton: {
    backgroundColor: "#355E49",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  imageDoc: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
