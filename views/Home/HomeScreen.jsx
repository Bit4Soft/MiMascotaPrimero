import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View } from "react-native";
import Header from "../../components/Layouts/Header";

import styles from "./HomeScreen.style";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header title="Cartilla Veterinaria" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Home</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
