import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./VaccinesGivenScreen.style";
import { useRoute } from "@react-navigation/native";
import { vacunasPerros, vacunasGatos } from "../../constants/vaccinesData";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebase";
import CustomDropdown from "../../components/Dropdown/DropDown";
import VaccineGiven from "../../components/Vaccines/VaccineGiven";

export default function VaccinesGivenScreen() {
  const route = useRoute();
  const { etapa = "", tipoAnimal = "" } = route.params || {};
  if (!etapa || !tipoAnimal) {
    return (
      <SafeAreaView>
        <Text>Error: No se recibieron los datos necesarios.</Text>
      </SafeAreaView>
    );
  }

  const [loading, setLoading] = useState(true);
  const [mascotaData, setMascotaData] = useState(null);
  const [vacunasEtapa, setVacunasEtapa] = useState([]);
  const [vacunasPuestas, setVacunasPuestas] = useState([]);
  const [vacunasNoPuestas, setVacunasNoPuestas] = useState([]);
  const [selectedVacuna, setSelectedVacuna] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchVacunas = async () => {
      const docRef = doc(db, "Mascota", "cartillaPrincipal");

      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMascotaData(data);

          const vacunas = tipoAnimal === "Perro" ? vacunasPerros : vacunasGatos;
          const vacunasEtapaActual = vacunas[etapa] || [];
          setVacunasEtapa(vacunasEtapaActual);

          const puestas = data.vacunas || [];

          setVacunasPuestas(
            puestas.filter((v) =>
              vacunasEtapaActual.some((ve) => ve.nombre === v.nombreVacuna)
            )
          );

          const puestasNombres = puestas.map((v) => v.nombreVacuna);
          const noPuestas = vacunasEtapaActual.filter(
            (v) => !puestasNombres.includes(v.nombre)
          );
          setVacunasNoPuestas(noPuestas);
        }
        setLoading(false);
      });
    };

    fetchVacunas();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleGuardarVacuna = async () => {
    if (!selectedVacuna) return;
    const docRef = doc(db, "Mascota", "cartillaPrincipal");

    const nuevaVacuna = {
      nombreVacuna: selectedVacuna,
      fecha: new Date().toISOString(),
      estado: true,
    };

    await updateDoc(docRef, {
      vacunas: [...(mascotaData.vacunas || []), nuevaVacuna],
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#355E49" />
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header
          title="Vacunas"
          icon={require("../../assets/icons/arrow-return.png")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titleSection}>Vacunas Puestas</Text>
        {vacunasPuestas.length > 0 ? (
          vacunasPuestas.map((item, index) => (
            <VaccineGiven
              key={`${item.nombreVacuna}-${index}`}
              vacuna={item}
              index={index}
            />
          ))
        ) : (
          <Text style={styles.textNoData}>No hay vacunas puestas</Text>
        )}

        <Text style={styles.titleSection}>Vacunas No Puestas</Text>
        <View style={styles.contentVaccine}>
          {vacunasNoPuestas.length > 0 ? (
            <Text style={styles.dataText}>
              {vacunasNoPuestas.map((v) => `❌ Vacuna: ${v.nombre}`).join("\n")}
            </Text>
          ) : (
            <Text style={styles.dataText}>
              Todas las vacunas han sido aplicadas.
            </Text>
          )}
        </View>

        <Text style={styles.titleSection}>Agregar Vacuna</Text>
        <CustomDropdown
          items={vacunasNoPuestas.map((v) => ({
            label: v.nombre,
            value: v.nombre,
          }))}
          placeholder="Selecciona una vacuna"
          value={selectedVacuna}
          onSelect={(item) => setSelectedVacuna(item.value)}
        />

        <View style={styles.contentButton}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleGuardarVacuna}
          >
            <Text style={styles.continueButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
