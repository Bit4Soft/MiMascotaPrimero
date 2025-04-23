import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./Header.style";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title, icon = null }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {icon && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
