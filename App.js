import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import BottonTabNavigator from "./navigation/BottonTapNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <BottonTabNavigator />
    </NavigationContainer>
  );
}
