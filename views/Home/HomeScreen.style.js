import { StyleSheet } from "react-native";

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
    justifyContent: "center",

  },
  text: {
    fontSize: 26,
    fontWeight: "light",
    color: "#1D2951",
    
  },
  statusBar: {
    backgroundColor: "#245e4b",
    barStyle: "light-content",
  },
  card: {
    width: 250,
    height: 290,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#f9f8f4',
    elevation: 3,
    alignItems: 'center',
    borderStyle: 'dotted',
    borderColor: 'black',
    borderWidth: 5,
  },

  image: {
    marginTop: 50,
    width: '90%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
    borderStyle: 'dotted',
    borderColor: 'black',
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
    
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  

});
