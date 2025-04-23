import React from "react";
import { View, FlatList, SafeAreaView, StatusBar } from "react-native";

import Header from "../../components/Layouts/Header";
import styles from "./CareDetailsScreen.style";
import CardCare from "../../components/Care/CardCare";

export default function CareDetailScreen({ route }) {
  const { title, data } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#245e4b" />

      <View style={styles.headerWrapper}>
        <Header
          title={title}
          icon={require("../../assets/icons/arrow-return.png")}
        />
      </View>

      <View style={{ flex: 1, backgroundColor: "#fff4ea" }}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.content}
          renderItem={({ item, index }) => (
            <View
              style={{
                marginRight: index % 2 === 0 ? 16 : 0,
                marginBottom: 16,
              }}
            >
              <CardCare title={item.title} image={item.image} />
            </View>
          )}
          ListFooterComponent={<View style={{ height: 32 }} />}
        />
      </View>
    </SafeAreaView>
  );
}
