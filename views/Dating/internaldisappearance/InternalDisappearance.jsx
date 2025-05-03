import React from "react";
import { useNavigation } from "@react-navigation/native";
import MenuScreen from "../../../components/MenuScreen/Menu";

export default function InterlDisappearance() {
  const navigation = useNavigation();
  
  const buttons = [
    {
      text: "Agendar cita",
      onPress: () => navigation.navigate("NewDate", { tipo: "Desparasitacion Interna" })
    },
    {
      text: "Citas Agendadas",
      onPress: () => navigation.navigate("apoiments", { tipo: "Desparasitacion Interna" })
    }
  ];

  return (
    <MenuScreen 
      title="Desparacitacion Interna"
      buttons={buttons}
      navigation={navigation}
    />
  );
}