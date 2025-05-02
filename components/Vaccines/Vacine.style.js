import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  contentVaccine: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#a6a6a6",
    marginBottom: 12,
  },
  imageVaccine: {
    width: 90,
    height: 90,
  },

  contentData: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },

  contentText: {
    flexDirection: "row",
    alignItems: "baseline",
    padding: 4,
  },

  titleText: {
    fontSize: theme.fontSize.regular,
    fontWeight: "bold",
    color: "#245e4b",
  },

  dataText: {
    fontSize: theme.fontSize.small,
  },
});
