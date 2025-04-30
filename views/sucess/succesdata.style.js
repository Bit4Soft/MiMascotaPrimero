import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff4ea",
    padding: 16,
    justifyContent: "space-between", 
    alignItems: "center",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: -150,
  },
  image: {
    marginTop: 80,
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  backButton: {
    backgroundColor: "#245e4b",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#fff",
    width: "50%",
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
