import React from "react";
import { View, Dimensions, SafeAreaView, StatusBar } from "react-native";

import Header from "../../components/Layouts/Header";
import styles from "./CareDetailsScreen.style";
import SliderItemCare from "../../components/Care/SliderItemCare";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export default function CareDetailScreen({ route }) {
  const { title, data } = route.params;
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      "worklet";
      scrollX.value = e.contentOffset.x;
    },
  });
  const width = Dimensions.get("window").width;
  const CARD_WIDTH = width * 0.8;
  const CARD_SPACING = 20;

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
        <Animated.FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <SliderItemCare
              title={item.title}
              image={item.image}
              description={item.description}
              scrollX={scrollX}
              index={index}
            />
          )}
          onScroll={onScrollHandler}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          snapToAlignment="center"
          contentContainerStyle={{
            paddingHorizontal: (width - CARD_WIDTH) / 2 - CARD_SPACING / 2,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
