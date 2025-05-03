import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VaccineGiven from "../../../components/Vaccines/VaccineGiven";
import { vacunasPerros, vacunasGatos } from "../../../constants/vaccinesData";
import styles from "./RecordVaccines.style";
import Header from "../../../components/Layouts/Header";


  export default function VaccinesApplied() {
    const [loading, setLoading] = useState(true);
    const [vacunasPuestas, setVacunasPuestas] = useState([]);

  useEffect(() => {
    let unsubscribe;
  
    const fetchVacunas = async () => {
      const id = await AsyncStorage.getItem("mascotaId");
      const docRef = doc(db, "Mascota", "cartillaPrincipal");
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const puestas = data.vacunas || [];
          setVacunasPuestas(puestas);
        }
        setLoading(false);
      });
    };
  
    fetchVacunas();
  
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#355E49" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Vacunas Aplicadas"
        icon={require("../../../assets/icons/arrow-return.png")}
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          {vacunasPuestas.length > 0 ? (
            vacunasPuestas.map((item, index) => (
              <VaccineGiven
                key={`${item.nombreVacuna}-${index}`}
                vacuna={item}
                index={index}
              />
            ))
          ) : (
            <Text>No hay vacunas aplicadas.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
