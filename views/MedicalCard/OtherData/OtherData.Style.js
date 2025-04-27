import { StyleSheet } from "react-native";

export default StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#245e4b",
      },
      header:{
        borderRadius:1,
        
      },
 
      content: {
        flexGrow: 1,
        backgroundColor: "#fff4ea",
        padding: 16,
      },
      section: {
        backgroundColor: '#fff4ea',
        borderRadius: 10,
        padding: 16,
        marginBottom: 5,
      },
      sectionTitle: {
        fontSize: 17,
        fontWeight: '400',
        color: "#000000",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#245e4b',
        paddingBottom: 8,
        textAlign: 'center', // Esto centrará el texto
        width: '100%', //

      },
      inputGroup: {
        marginBottom: 15,
      },
      label: {
        fontSize: 16,
        color: "#1D2951",
        marginBottom: 5,
        fontWeight: '50',
      },

      continueButton: {
        backgroundColor: "#245e4b",
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 25,
      },
      continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      twoColumnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
      },
      column: {
        width: '48%', // Deja un pequeño espacio entre columnas
      },




});