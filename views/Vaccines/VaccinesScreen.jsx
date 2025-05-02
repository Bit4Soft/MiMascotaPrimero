import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./VaccinesScreen.style";
import Vaccine from "../../components/Vaccines/Vaccine";
import { vacunasPerros, vacunasGatos } from "../../constants/vaccinesData";
import CustomDropdown from "../../components/Dropdown/DropDown";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VaccinesScreen() {
  const navigation = useNavigation();
  const [tipoAnimal, setTipoAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchTipoAnimalRealtime = async () => {
      try {
        const id = await AsyncStorage.getItem("mascotaId");
        if (!id) return;

        const docRef = doc(db, "Mascota", id);
        unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTipoAnimal(data.selectedTipoAnimal);
          } else {
            setTipoAnimal(null);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Error al escuchar el tipo de animal:", error);
        setLoading(false);
      }
    };

    fetchTipoAnimalRealtime();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const vacunasPorTipo =
    tipoAnimal === "Perro"
      ? vacunasPerros
      : tipoAnimal === "Gato"
      ? vacunasGatos
      : {};

  const etapas = Object.keys(vacunasPorTipo).map((etapa) => ({
    label: etapa,
    value: etapa,
  }));

  useEffect(() => {
    if (etapas.length > 0 && !selectedStage) {
      setSelectedStage(etapas[0].value);
    }
  }, [etapas]);

  const vacunasFiltradas = selectedStage
    ? vacunasPorTipo[selectedStage] || []
    : [];

  if (loading || !tipoAnimal || !selectedStage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentLoading}>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#355E49" />
            <Text style={styles.textLoading}>Cargando datos...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header title="Vacunas" />
      </View>

      <View style={styles.content}>
        <View style={styles.centerContent}>
          <Text style={styles.titleText}>Etapa de crecimiento</Text>
        </View>

        <CustomDropdown
          items={etapas}
          placeholder="Selecciona etapa"
          value={selectedStage}
          onSelect={(item) => setSelectedStage(item.value)}
        />

        <View style={styles.centerContent}>
          <Text style={styles.vaccinesText}>Vacunas recomendadas</Text>
        </View>

        <FlatList
          contentContainerStyle={{ paddingBottom: 40 }}
          data={vacunasFiltradas}
          keyExtractor={(item, index) => `${item.nombre}-${index}`}
          renderItem={({ item, index }) => (
            <Vaccine data={item} index={index} />
          )}
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            navigation.navigate("VaccinesGiven", {
              etapa: selectedStage,
              tipoAnimal: tipoAnimal,
            })
          }
        >
          <Text style={styles.continueButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
