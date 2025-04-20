import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View } from "react-native";
import Header from "../../components/Layouts/Header";

import styles from "./VaccinesScreen.style";

export default function VaccinesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header title="Vacunas" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Vacunas</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
