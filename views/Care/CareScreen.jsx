import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View } from "react-native";
import Header from "../../components/Layouts/Header";

import styles from "./CareScreen.style";

export default function CareScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header
          title="Tips y Cuidados"
          icon={require("../../assets/icons/care-active.png")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Cuidados</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
