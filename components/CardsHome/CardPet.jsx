import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./CardPet.style";

const PetCard = ({ nombre, petImage, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: petImage }} style={styles.image} />
      <Text style={styles.name}>{nombre}</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetCard;
