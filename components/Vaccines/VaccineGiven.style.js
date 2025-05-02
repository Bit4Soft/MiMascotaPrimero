import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  contentVaccine: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    borderWidth: 2,
    borderColor: "#a6a6a6",
    marginBottom: 12,
    alignItems: "center",
  },
  column: {
    flex: 1,
  },
  contentData: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    marginBottom: 4,
  },

  titleText: {
    fontSize: theme.fontSize.regular,
    fontWeight: "bold",
    color: "#245e4b",
  },
  dataText: {
    fontSize: theme.fontSize.small,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 12,
    alignSelf: "center",
  },
});
