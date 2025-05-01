import { Dimensions, StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import styles from "./SliderItemCare.style";

const width = Dimensions.get("window").width;
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = 16;

export default function SliderItemCare({
  title,
  image,
  description,
  index,
  scrollX,
}) {
  const inputRange = [
    (index - 1) * (CARD_WIDTH + CARD_SPACING),
    index * (CARD_WIDTH + CARD_SPACING),
    (index + 1) * (CARD_WIDTH + CARD_SPACING),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      scrollX.value,
      inputRange,
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        <Image source={image} style={styles.itemImage} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}
