import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../database/firebase";
import styles from "./appointments.style";
import Header from "../../../components/Layouts/Header";

export default function CitasFiltradas() {
  const route = useRoute();
  const { tipo } = route.params || {};
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const citasRef = collection(db, "citas");
        const q = query(citasRef, where("tipo", "==", tipo));
        const snapshot = await getDocs(q);
        const citasFiltradas = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCitas(citasFiltradas);
      } catch (error) {
        console.error("Error al obtener citas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [tipo]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando citas...</Text>
      </View>
    );
  }

  if (citas.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={styles.statusBar} />
        <Header
          title="Citas"
          icon={require("../../../assets/icons/arrow-return.png")}
          onPress={() => navigation.goBack()}
        ></Header>
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            No hay citas registradas para "{tipo}".
          </Text>
          <Image
            source={require("../../../assets/icons/apoints.png")}
            style={styles.imagenlogo}
          ></Image>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <Header
        title="Citas"
        icon={require("../../../assets/icons/arrow-return.png")}
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {citas.map((cita) => (
          <View key={cita.id} style={styles.card}>
            <Text style={styles.title}>{cita.tipo}</Text>
            <Text>📅 {cita.fecha}</Text>
            <Text>🕒 {cita.horario}</Text>
            <Text>📞 {cita.telefono}</Text>
            {cita.notas ? <Text>📝 {cita.notas}</Text> : null}
            <Text style={styles.estado}>Estado: {cita.estado}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
