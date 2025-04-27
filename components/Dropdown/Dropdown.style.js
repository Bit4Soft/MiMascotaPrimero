import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      width: '100%',
      height: 60,
      marginVertical: 10,
    },
    dropdownButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: "#fff"
    },
    buttonText: {
      fontSize: 16,
    },
    arrow: {
      fontSize: 12,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dropdownList: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      borderRadius: 5,
      maxHeight: 300,
    },
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  });