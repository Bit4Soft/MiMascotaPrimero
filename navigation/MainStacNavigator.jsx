import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottonTapNavigator";
import MedicalCard from "../views/MedicalCard/MedicalCard";
import CareDetailsScreen from "../views/Care/CareDetailsScreen";
import DatosAdicionales from "../views/MedicalCard/OtherData/OtherData";
import SucessData from "../views/sucess/sucessdata";

const Stack = createNativeStackNavigator();
export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Cartilla" component={MedicalCard} />
      <Stack.Screen name="CareDetails" component={CareDetailsScreen} />
      <Stack.Screen name="Othersdata" component={DatosAdicionales} />
      <Stack.Screen name="Sucess" component={SucessData} />
    </Stack.Navigator>
  );
}
