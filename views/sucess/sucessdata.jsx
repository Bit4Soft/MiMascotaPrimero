import React from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./succesdata.style";
import { useNavigation } from '@react-navigation/native';

export default function SucessData() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.centerSection}>
          <Text style={styles.text}>¡los Datos Se Guardaron Correctamente!</Text>
          <Image
            style={styles.image}
            source={require("../../assets/pulgara.png")}
          />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Tabs')}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>Inicio</Text>
        </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
