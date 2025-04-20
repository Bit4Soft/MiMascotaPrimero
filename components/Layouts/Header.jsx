import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Header.style";

export default function Header({ title, icon = null }) {
  return (
    <View style={styles.header}>
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
