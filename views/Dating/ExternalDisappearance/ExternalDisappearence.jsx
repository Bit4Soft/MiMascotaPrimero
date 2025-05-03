import React from "react";
import { useNavigation } from "@react-navigation/native";
import MenuScreen from "../../../components/MenuScreen/Menu";

export default function ExternalDisapparence() {
  const navigation = useNavigation();
  
  const buttons = [
    {
      text: "Agendar cita",
      onPress: () => navigation.navigate("NewDate", { tipo:"Desparasitacion Externa" })
    },
    {
      text: "Citas Agendadas",
      onPress: () => navigation.navigate("apoiments", { tipo:"Desparasitacion Externa"})
    }
  ];

  return (
    <MenuScreen 
      title="Desparacitacion Externa"
      buttons={buttons}
      navigation={navigation}
    />
  );
}