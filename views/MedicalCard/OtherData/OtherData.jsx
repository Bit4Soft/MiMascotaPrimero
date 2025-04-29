import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
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
  const navigation = useNavigation();
  const { petData } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    createdAt: serverTimestamp(),
  });

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

  const validateFields = () => {
    const newErrors = {};

    const requiredFields = {
      user_nombre: userData.nombre,
      user_telefono: userData.telefono,
      user_email: userData.email,
      user_direccion: userData.direccion,
      clinica_direccion: clinicaData.direccion,
      clinica_telefono: clinicaData.telefono,
      clinica_email: clinicaData.email,
      clinica_nombre: clinicaData.nombreClinica,
      veterinario_nombre: clinicaData.veterinarios[0].nombreVete,
      veterinario_cedula: clinicaData.veterinarios[0].cedula,
    };

    Object.entries(requiredFields).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalizar = async () => {
    if (!validateFields()) {
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

      const userRef = await addDoc(collection(db, "Users"), {
        ...userData,
      });

      const clinicRef = await addDoc(collection(db, "Clinicas"), {
        ...clinicaData,
        veterinarios: [
          {
            nombre: clinicaData.veterinarios[0].nombreVete,
            cedula: clinicaData.veterinarios[0].cedula,
          },
        ],
      });

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
          <View style={styles.container}>
            <View style={styles.ownerDataSection}>
              <Text style={styles.sectionTitle}>Datos del dueño</Text>
              <Text style={styles.text}>Nombre</Text>
              <InputText
                style={[styles.input, errors.user_nombre && { borderColor: "red" }]}
                placeholder="Hugo Montaño"
                value={userData.nombre}
                onChangeText={(text) => {
                  setUserData({ ...userData, nombre: text });
                  if (errors.user_nombre) setErrors((e) => ({ ...e, user_nombre: null }));
                }}
              />
              {errors.user_nombre && <Text style={styles.errorText}>{errors.user_nombre}</Text>}

              <Text style={styles.text}>Direccion</Text>
              <InputText
                style={[styles.input, errors.user_direccion&& { borderColor: "red" }]}
                placeholder="Calle 123"
                value={userData.direccion}
                onChangeText={(text) =>{

                  setUserData({ ...userData, direccion: text });
                  if (errors.user_direccion) setErrors((e) => ({ ...e, user_direccion: null }));
                }}
              />
               {errors.user_direccion && <Text style={styles.errorText}>{errors.user_direccion}</Text>}

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Telefono</Text>
                  <InputText
                    style={[styles.input, errors.user_telefono && { borderColor: "red" }]}
                    placeholder="322-157-59-92"
                    keyboardType="numeric"
                    value={userData.telefono}
                    onChangeText={(text) => {
                      setUserData({ ...userData, telefono: formatPhoneNumber(text) });
                      if (errors.user_telefono) setErrors((e) => ({ ...e, user_telefono: null }));
                    }}
                  />
                  {errors.user_telefono && <Text style={styles.errorText}>{errors.user_telefono}</Text>}
                </View>
                <View style={styles.column}>
                  <Text style={styles.text}>Email</Text>
                  <InputText
                    style={[styles.input, errors.user_email && { borderColor: "red" }]}
                    placeholder="pet@gmail.com"
                    keyboardType="email-address"
                    value={userData.email}
                    onChangeText={(text) => {

                      setUserData({ ...userData, email: text });
                      if (errors.user_email) setErrors((e) => ({ ...e, user_email: null }));
                    }}
                  />
               {errors.user_email && <Text style={styles.errorText}>{errors.user_email}</Text>}

                </View>
              </View>
            </View>

            <View style={styles.clinicDataSection}>
              <Text style={styles.sectionTitle}>Datos de la clinica</Text>
              <Text style={styles.text}>Nombre de la clinica</Text>
              <InputText
                style={[styles.input, errors.clinica_nombre && { borderColor: "red" }]}
                placeholder="Event Pet"
                value={clinicaData.nombreClinica}
                onChangeText={(text) => {
                  setClinicaData({ ...clinicaData, nombreClinica: text });
                  if (errors.clinica_nombre) setErrors((e) => ({ ...e, clinica_nombre: null }));
                }}
              />
              {errors.clinica_nombre && <Text style={styles.errorText}>{errors.clinica_nombre}</Text>}

              <Text style={styles.text}>Direccion</Text>
              <InputText
                style={[styles.input, errors.clinica_direccion && { borderColor: "red" }]}
                placeholder="Calle 123"
                value={clinicaData.direccion}
                onChangeText={(text) =>{

                  setClinicaData({ ...clinicaData, direccion: text });
                  if (errors.clinica_direccion) setErrors((e) => ({ ...e, clinica_direccion: null }));
                } }
              />
                  {errors.clinica_direccion && <Text style={styles.errorText}>{errors.clinica_direccion}</Text>}


              <Text style={styles.text}>Nombre del veterinario</Text>
              <InputText
                style={[styles.input, errors.veterinario_nombre && { borderColor: "red" }]}
                placeholder="Saul Hernandez"
                value={clinicaData.veterinarios[0].nombreVete}
                onChangeText={(text) => {
                  const updatedVets = [{ ...clinicaData.veterinarios[0], nombreVete: text }];
                  setClinicaData({ ...clinicaData, veterinarios: updatedVets });
                  if (errors.veterinario_nombre) setErrors((e) => ({ ...e, veterinario_nombre: null }));
                }}
              />
              {errors.veterinario_nombre && <Text style={styles.errorText}>{errors.veterinario_nombre}</Text>}

              <Text style={styles.text}>Num. de cedula</Text>
              <InputText
                style={[styles.input, errors.veterinario_cedula && { borderColor: "red" }]}
                placeholder="1234567"
                keyboardType="numeric"
                value={clinicaData.veterinarios[0].cedula}
                onChangeText={(text) => {
                  const updatedVets = [{ ...clinicaData.veterinarios[0], cedula: text }];
                  setClinicaData({ ...clinicaData, veterinarios: updatedVets });
                  if (errors.veterinario_cedula) setErrors((e) => ({ ...e, veterinario_cedula: null }));
                }}
              />
              {errors.veterinario_cedula && <Text style={styles.errorText}>{errors.veterinario_cedula}</Text>}

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Telefono</Text>
                  <InputText
                    style={[styles.input, errors.clinica_telefono && { borderColor: "red" }]}
                    placeholder="322-157-59-92"
                    keyboardType="numeric"
                    value={clinicaData.telefono}
                    onChangeText={(text) =>{
                      setClinicaData({ ...clinicaData, telefono: formatPhoneNumber(text) })
                      if (errors.clinica_telefono) setErrors((e) => ({ ...e, clinica_telefono: null }));}
                      
                    } 
                  />
                  {errors.clinica_telefono && <Text style={styles.errorText}>{errors.clinica_telefono}</Text>}
                </View>
                <View style={styles.column}>
                  <Text style={styles.text}>Email</Text>
                  <InputText
                    style={[styles.input, errors.clinica_email && { borderColor: "red" }]}
                    placeholder="pet@gmail.com"
                    keyboardType="email-address"
                    value={clinicaData.email}
                    onChangeText={(text) => {
                      setClinicaData({ ...clinicaData, email: text })
                      if (errors.clinica_email) setErrors((e) => ({ ...e, clinica_email: null }));
                    }}

                  />
                  {errors.clinica_email && <Text style={styles.errorText}>{errors.clinica_email}</Text>}

                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleFinalizar}>
            <Text style={styles.continueButtonText}>Finalizar Registro</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}