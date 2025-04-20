import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";

import HomeScreen from "../views/Home/HomeScreen";
import CareScreen from "../views/Care/CareScreen";
import Vaccines from "../views/Vaccines/VaccinesScreen";
import DatingScreen from "../views/Dating/DatingScreen";
import theme from "../constants/theme";

const Tab = createBottomTabNavigator();
import icon from "../assets/icons/home-inactive.png";
const icons = {
  Home: {
    active: require("../assets/icons/home-active.png"),
    inactive: require("../assets/icons/home-inactive.png"),
  },
  Cuidados: {
    active: require("../assets/icons/care-active.png"),
    inactive: require("../assets/icons/care-inactive.png"),
  },
  Vacunas: {
    active: require("../assets/icons/vaccines-active.png"),
    inactive: require("../assets/icons/vaccines-inactive.png"),
  },
  Citas: {
    active: require("../assets/icons/dating-active.png"),
    inactive: require("../assets/icons/dating-inactive.png"),
  },
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: theme.fontSize.small,
              color: focused ? "#a4c672" : "#fff4ea",
              fontFamily: theme.fontFamily,
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused ? icons[route.name].active : icons[route.name].inactive
            }
            style={{
              width: 24,
              height: 24,
              resizeMode: "contain",
            }}
          />
        ),
        tabBarStyle: {
          height: 80,
          paddingVertical: 5,
          paddingTop: 4,
          paddingBottom: 10,
          backgroundColor: "#245e4b",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cuidados" component={CareScreen} />
      <Tab.Screen name="Vacunas" component={Vaccines} />
      <Tab.Screen name="Citas" component={DatingScreen} />
    </Tab.Navigator>
  );
}
