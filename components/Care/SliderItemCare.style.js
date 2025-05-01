import { Dimensions, StyleSheet } from "react-native";
import theme from "../../constants/theme";
const width = Dimensions.get("window").width;
const CARD_SPACING = 16;
export default StyleSheet.create({
  itemContainer: {
    width: width * 0.8,
    height: 420,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#245e4b",
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 12,
    marginHorizontal: CARD_SPACING / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemImage: {
    width: 200,
    height: 200,
  },
  textContainer: {
    padding: 24,
    justifyContent: "space-between",
    flex: 1,
  },
  itemTitle: {
    fontSize: theme.fontSize.large,
    fontWeight: "bold",
    color: "#245e4b",
    marginBottom: 8,
    textAlign: "center",
  },
  itemDescription: {
    fontSize: theme.fontSize.regular,
    color: "#eee",
    textAlign: "center",
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    color: "#000000b3",
  },
});
