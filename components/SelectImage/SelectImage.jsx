import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./selecstyles";

const PetImagePicker = ({ onImageSelected, initialImage }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a las fotos");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (initialImage) setImage(initialImage);
  }, [initialImage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Image
              source={require("../../assets/icons/plus.png")}
              style={styles.defaultImage}
            />
            <Text style={styles.placeholderText}>Agregar Imagen</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PetImagePicker;
