import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./OtherData.Style";
import Header from "../../../components/Layouts/Header";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../../components/InputText/InputText";
import { db, storage } from "../../../database/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ActivityIndicator } from "react-native-paper";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";

export default function DatosAdicionales({ route }) {
  // Variable para la navegacion
  const navigation = useNavigation();
  // Variable para guardar los datos de la mascota
  const { petData } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);

  //Estado para los datos del dueño
  const [userData, setUserData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    createdAt: serverTimestamp(),
  });

  //Estado para los datos de la clinica
  const [clinicaData, setClinicaData] = useState({
    nombreClinica: "",
    direccion: "",
    telefono: "",
    email: "",
    veterinarios: [
      {
        nombreVete: "",
        cedula: "",
      },
    ],
    createdAt: serverTimestamp(),
  });

  //Funcion para manejar el evento de finalizar registro
  // Esta funcion se encarga de guardar los datos del dueño, clinica y mascota en la base de datos
  const handleFinalizar = async () => {
    const { nombre, telefono } = userData;
    const { nombreClinica } = clinicaData;
    const { cedula, nombreVete } = clinicaData.veterinarios[0];
    if (!nombre || !telefono || !nombreClinica || !nombreVete || !cedula) {
      Alert.alert("Campos requeridos", "Complete los campos obligatorios");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = null;
      if (petData?.petImage) {
        const filename = `mascotas/${Date.now()}.jpg`;
        const storageRef = ref(storage, filename);

        const response = await fetch(petData.petImage);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Guardar datos del dueño
      const userRef = await addDoc(collection(db, "Users"), {
        nombre: userData.nombre,
        direccion: userData.direccion,
        telefono: userData.telefono,
        email: userData.email,
        createdAt: userData.createdAt,
      });

      // Guardar datos de la clínica
      const clinicRef = await addDoc(collection(db, "Clinicas"), {
        nombre: clinicaData.nombreClinica,
        direccion: clinicaData.direccion,
        telefono: clinicaData.telefono,
        email: clinicaData.email,
        veterinarios: [
          {
            nombre: clinicaData.veterinarios[0].nombreVete,
            cedula: clinicaData.veterinarios[0].cedula,
          },
        ],
        createdAt: clinicaData.createdAt,
      });

      // Guardar datos de la mascota
      await addDoc(collection(db, "Mascota"), {
        ...petData,
        imageUrl: imageUrl,
        duenoRef: userRef.id,
        clinicaRef: clinicRef.id,
        createdAt: serverTimestamp(),
      });

      navigation.navigate("Cartilla");
    } catch (error) {
      console.error("Error completo:", error);
      Alert.alert("Error", "No se pudo guardar: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Guardando datos...</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Header
            title="Datos Adicionales"
            showBackButton={true}
            icon={require("../../../assets/icons/arrow-return.png")}
          />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* User Data */}
          <View style={styles.container}>
            <View style={styles.ownerDataSection}>
              <Text style={styles.sectionTitle}>Datos del dueño</Text>
              <Text style={styles.text}>Nombre</Text>
              <InputText
                style={styles.input}
                placeholder="Hugo Montaño"
                value={userData.nombre}
                onChangeText={(text) =>
                  setUserData({ ...userData, nombre: text })
                }
              />
              <Text style={styles.text}>Direccion</Text>
              <InputText
                style={styles.input}
                placeholder="Calle 123"
                value={userData.direccion}
                onChangeText={(text) =>
                  setUserData({ ...userData, direccion: text })
                }
              />
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Telefono</Text>
                  <InputText
                    style={styles.input}
                    placeholder="322-157-59-92"
                    value={userData.telefono}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setUserData({
                        ...userData,
                        telefono: formatPhoneNumber(text),
                      })
                    }
                  />
                </View>
                <View style={styles.column}>
                  <Text style={styles.text}>Email</Text>
                  <InputText
                    style={styles.input}
                    placeholder="pet@gmail.com"
                    value={userData.email}
                    keyboardType="email-address"
                    onChangeText={(text) =>
                      setUserData({ ...userData, email: text })
                    }
                  />
                </View>
              </View>
            </View>
            {/* Clinic Data */}
            <View style={styles.clinicDataSection}>
              <Text style={styles.sectionTitle}>Datos de la clinica</Text>

              <Text style={styles.text}>Nombre de la clinica</Text>
              <InputText
                style={styles.input}
                placeholder="Event Pet"
                value={clinicaData.nombreClinica}
                onChangeText={(text) =>
                  setClinicaData({ ...clinicaData, nombreClinica: text })
                }
              />
              <Text style={styles.text}>Direccion</Text>
              <InputText
                style={styles.input}
                placeholder="Calle 123"
                value={clinicaData.direccion}
                onChangeText={(text) =>
                  setClinicaData({ ...clinicaData, direccion: text })
                }
              />

              <Text style={styles.text}>Nombre del veterinario</Text>
              <InputText
                style={styles.input}
                placeholder="Saul Hernandez"
                value={clinicaData.veterinarios.nombreVete}
                onChangeText={(text) =>
                  setClinicaData({
                    ...clinicaData,
                    veterinarios: [
                      { ...clinicaData.veterinarios[0], nombreVete: text },
                    ],
                  })
                }
              />
              <Text style={styles.text}>Num. de cedula</Text>
              <InputText
                style={styles.input}
                placeholder="1234567"
                value={clinicaData.veterinarios.cedula}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setClinicaData({
                    ...clinicaData,
                    veterinarios: [
                      { ...clinicaData.veterinarios[0], cedula: text },
                    ],
                  })
                }
              />

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Telefono</Text>
                  <InputText
                    style={styles.input}
                    placeholder="322-157-59-92"
                    keyboardType="numeric"
                    value={clinicaData.telefono}
                    onChangeText={(text) =>
                      setClinicaData({
                        ...clinicaData,
                        telefono: formatPhoneNumber(text),
                      })
                    }
                  />
                </View>
                <View style={styles.column}>
                  <Text style={styles.text}>Email</Text>
                  <InputText
                    style={styles.input}
                    placeholder="pet@gmail.com"
                    keyboardType="email-address"
                    value={clinicaData.email}
                    onChangeText={(text) =>
                      setClinicaData({ ...clinicaData, email: text })
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          {/* Botón Finalizar */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleFinalizar}
          >
            <Text style={styles.continueButtonText}>Finalizar Registro</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
