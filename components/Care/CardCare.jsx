import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./CardCare.style";
export default function CardCare({ image, title, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
