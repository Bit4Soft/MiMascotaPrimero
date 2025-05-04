import { StyleSheet } from "react-native";
import theme from "../../../constants/theme";

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
    justifyContent: "flex-start",
  },
  contentData: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  contentVaccine: {
    padding: 16,
    borderWidth: 2,
    borderColor: "#a6a6a6",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  dataText: {
    fontSize: theme.fontSize.regular,
  },
  titleText: {
    fontSize: theme.fontSize.regular,
    fontWeight: "bold",
    color: "#245e4b",
  },

  continueButton: {
    backgroundColor: "#245e4b",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  titleSection: {
    fontSize: theme.fontSize.large,
    paddingBottom: 10,
  },
  contentButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  textempty: {
    fontSize: 18,
    color: "#111",
    textAlign: "center",
    fontWeight: "bold",
    top: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    bottom: -100,
  },
});
