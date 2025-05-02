import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },

  content: {
    flexGrow: 1,
    backgroundColor: "#f3eddf",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
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
  Button: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#a4c672",
    borderRadius: 10,
    width: "80%",
    height: 45,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1D2951",
  },
  ButtonText2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1D2951",
    position: "absolute",
    right: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },

});
