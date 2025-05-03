import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./CardPet.style";

const PetCard = ({ nombre, imageUrl, onPress }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {loadingImage && (
          <View style={styles.imageLoader}>
            <ActivityIndicator size="small" color="#355E49" />
          </View>
        )}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onLoadStart={() => setLoadingImage(true)}
          onLoadEnd={() => setLoadingImage(false)}
        />
      </View>
      <Text style={styles.name}>{nombre}</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetCard;
