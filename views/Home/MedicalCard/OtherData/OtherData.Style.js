import { StyleSheet } from "react-native";
import theme from "../../../../constants/theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  header: {
    borderRadius: 1,
  },

  content: {
    flexGrow: 1,
    backgroundColor: "#fff4ea",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#245e4b",
    paddingBottom: 8,
    textAlign: "center",
    width: "100%",
  },

  continueButton: {
    backgroundColor: "#245e4b",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  column: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#000",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  textLoading: {
    paddingTop: 20,
    fontSize: theme.fontSize.xLarge,
    color: "#1D2951",
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
});
