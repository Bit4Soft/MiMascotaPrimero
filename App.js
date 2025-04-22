
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigation/MainStacNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
