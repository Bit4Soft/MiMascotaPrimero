import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottonTapNavigator";
import MedicalCard from "../views/Medical Card/MedicalCard";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Cartilla" component={MedicalCard} />
    </Stack.Navigator>
  );
}

