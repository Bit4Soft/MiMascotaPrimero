import React from "react";
import { SafeAreaView, Text, ScrollView, View } from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./MedicalCard.style"

export default function MedicalCard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <Header title="Datos de la Mascota" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>LLene los datos del animal</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
