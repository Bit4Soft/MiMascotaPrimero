import { StyleSheet } from "react-native";
import theme from "../../constants/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  scrollView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    backgroundColor: "#fff4ea",
    padding: 16,
  },
  text: {
    fontSize: theme.fontSize.regular,
    fontFamily: theme.fontFamily,
    fontWeight: "regular",
    color: "#000000",
    textAlign: "start",
  },

  firstSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  dataContainer: {
    paddingLeft: 10,
    flex: 1,
  },

  secondSectionContainer: {
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  column: {
    flex: 1,
  },

  continueButton: {
    backgroundColor: "#245e4b",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#fff",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorInput: {
    borderColor: 'red', // Borde rojo en caso de error
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
