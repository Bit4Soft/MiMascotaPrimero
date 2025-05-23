import React from "react";
import { useNavigation } from "@react-navigation/native";
import MenuScreen from "../../../components/MenuScreen/Menu";

export default function PeriodicReviews() {
  const navigation = useNavigation();
  
  const buttons = [
    {
      text: "Agendar cita",
      onPress: () => navigation.navigate("NewDate", { tipo: "Revision Periodica" })
    },
    {
      text: "Citas Agendadas",
      onPress: () => navigation.navigate("apoiments", { tipo: "Revision Periodica" })
    }
  ];

  return (
    <MenuScreen 
      title="Revisiones Periódicas"
      buttons={buttons}
      navigation={navigation}
    />
  );
}