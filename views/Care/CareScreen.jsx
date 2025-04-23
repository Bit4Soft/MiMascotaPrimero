import React from "react";
import { SafeAreaView, StatusBar, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Layouts/Header";

import styles from "./CareScreen.style";
import CardCare from "../../components/Care/CardCare";
import dataCare from "../../components/Care/DataCare";

export default function CareScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header title="Tips y Cuidados" />
      </View>

      <FlatList
        contentContainerStyle={styles.content}
        data={dataCare}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}
          >
            <CardCare
              title={item.title}
              image={item.image}
              onPress={() =>
                navigation.navigate("CareDetails", {
                  title: item.title,
                  data: item.data,
                })
              }
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
