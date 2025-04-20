import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View } from "react-native";
import Header from "../../components/Layouts/Header";

import styles from "./DatingScreen.style";

export default function DatingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header title="Citas" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Citas</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
