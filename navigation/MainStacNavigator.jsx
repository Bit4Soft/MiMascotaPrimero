import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottonTapNavigator";
import MedicalCard from "../views/Home/MedicalCard/MedicalCard";
import CareDetailsScreen from "../views/Care/CareDetailsScreen";
import DatosAdicionales from "../views/Home/MedicalCard/OtherData/OtherData";
import SucessData from "../views/Home/sucess/sucessdata";
import EditDataPet from "../views/Home/EditData/EditDataPet";
import PeriodicReviews from "../views/Dating/Periodicreviews/PeriodicRevies";
import NewDate from "../views/Dating/Newdate/NewDate";
import VaccinesGivenScreen from "../views/Vaccines/VaccinesGivenScreen";
import RecordVacc from "../views/Dating/RecordVaccines/RecordVaccines";
import InterlDisappearance from "../views/Dating/internaldisappearance/InternalDisappearance";
import ExternalDisapparence from "../views/Dating/ExternalDisappearance/ExternalDisappearence";
import Appointments from "../views/Dating/appointments/appointments";

const Stack = createNativeStackNavigator();
export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Cartilla" component={MedicalCard} />
      <Stack.Screen name="CareDetails" component={CareDetailsScreen} />
      <Stack.Screen name="Othersdata" component={DatosAdicionales} />
      <Stack.Screen name="Sucess" component={SucessData} />
      <Stack.Screen name="EditDataPet" component={EditDataPet} />
      <Stack.Screen name="Revisiones" component={PeriodicReviews} />
      <Stack.Screen name="NewDate" component={NewDate} />
      <Stack.Screen name="VaccinesGiven" component={VaccinesGivenScreen} />
      <Stack.Screen name="RecordVac" component={RecordVacc} />
      <Stack.Screen name="InternalDisap" component={InterlDisappearance} />
      <Stack.Screen name="ExternalDisap" component={ExternalDisapparence} />
      <Stack.Screen name="apoiments" component={Appointments} />
    </Stack.Navigator>
  );
}
