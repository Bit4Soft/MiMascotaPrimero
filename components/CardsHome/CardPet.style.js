import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#355E49",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: 230,
    height: 220,
    borderRadius: 20,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#F5EDE1",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  imageWrapper: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  imageLoader: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
});
