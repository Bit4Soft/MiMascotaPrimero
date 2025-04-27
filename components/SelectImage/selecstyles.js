import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      position: 'absolute',  // Posicionamiento absoluto
      top: 5,               // 10px desde el borde superior
      left: 5,              // 10px desde el borde izquierdo
      zIndex: 1, 
    },

    imageContainer: {
      width: 150,
      height: 150,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      resizeMode: 'contain',
      borderStyle: 'dotted',
      borderColor: 'black',
    },
    image: {
    width: '100%',
    height: '100%',
    },
    placeholder: {
      alignItems: 'center',
      padding: 20,
    },
    defaultImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
      opacity: 0.6,
      resizeMode: 'contain',
    },
    placeholderText: {
      color: '#666',
      textAlign: 'center',
    },
  });