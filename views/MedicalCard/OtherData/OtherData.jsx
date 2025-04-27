import React, { useState } from "react"; 
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./OtherData.Style";
import Header from "../../../components/Layouts/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputText from "../../../components/InputText/InputText";
import { db, storage } from "../../../database/firebase"; // tu archivo de conexión
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ActivityIndicator } from "react-native-paper";

export default function DatosAdicionales() {
  const navigation = useNavigation();
  const route = useRoute();
  const { petData } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);

  const [nombreDueno, setNombreDueno] = useState("");
  const [direccionDueno, setDireccionDueno] = useState("");
  const [telefonoDueno, setTelefonoDueno] = useState("");
  const [emailDueno, setEmailDueno] = useState("");

  const [nombreClinica, setNombreClinica] = useState("");
  const [direccionClinica, setDireccionClinica] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefonoClinica, setTelefonoClinica] = useState("");
  const [emailClinica, setEmailClinica] = useState("");

  const handleFinalizar = async () => { 
    if (!nombreDueno || !telefonoDueno || !nombreClinica || !veterinario || !cedula) {
      Alert.alert("Campos requeridos", "Complete los campos obligatorios");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // 1. Subir imagen a Storage si existe
      let imageUrl = null;
      if (petData?.petImage) {
        const filename = `mascotas/${Date.now()}.jpg`;
        const storageRef = ref(storage, filename);
  
        const response = await fetch(petData.petImage);
        const blob = await response.blob();
  
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      // 2. Guardar datos del dueño
      const userRef = await addDoc(collection(db, "Users"), {
        nombre: nombreDueno,
        direccion: direccionDueno,
        telefono: telefonoDueno,
        email: emailDueno,
        createdAt: serverTimestamp(),
      });
  
      // 3. Guardar datos de la clínica
      const clinicRef = await addDoc(collection(db, "Clinicas"), {
        nombre: nombreClinica,
        direccion: direccionClinica,
        telefono: telefonoClinica,
        email: emailClinica,
        veterinarios: [
          {
            nombre: veterinario,
            cedula: cedula,
          }
        ],
        createdAt: serverTimestamp(),
      });
  
      // 4. Guardar datos de la mascota
      await addDoc(collection(db, "Mascota"), {
        ...petData,
        imageUrl: imageUrl,
        duenoRef: userRef.id,
        clinicaRef: clinicRef.id,
        createdAt: serverTimestamp(),
      });
  
      navigation.navigate("FinalScreen");
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Header title="Datos Adicionales" showBackButton={true} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Sección Datos del Dueño */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del dueño</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. Hugo Montaño"
              value={nombreDueno}
              onChangeText={setNombreDueno}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. Júbuez #434"
              value={direccionDueno}
              onChangeText={setDireccionDueno}
            />
          </View>
          
          <View style={styles.twoColumnsContainer}>
            {/* Columna Teléfono */}
            <View style={styles.column}>
                <Text style={styles.label}>Teléfono</Text>
                <InputText
                style={styles.input}
                placeholder="Ej. +52 3221573423"
                value={telefonoDueno}
                onChangeText={setTelefonoDueno}
                keyboardType="phone-pad"
                />
            </View>
            
            {/* Columna Email */}
            <View style={styles.column}>
                <Text style={styles.label}>Email</Text>
                <InputText
                style={styles.input}
                placeholder="ejemplo@gmail.com"
                value={emailDueno}
                onChangeText={setEmailDueno}
                keyboardType="email-address"
                autoCapitalize="none"
                />
            </View>
            </View>
        </View>

        {/* Sección Datos de la Clínica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de la clínica</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de la Clínica</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. Evee Animal"
              value={nombreClinica}
              onChangeText={setNombreClinica}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. Júaruez #434"
              value={direccionClinica}
              onChangeText={setDireccionClinica}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Médico Veterinario</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. Saul Ernesto"
              value={veterinario}
              onChangeText={setVeterinario}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cédula Profesional</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. Licencia 12345"
              value={cedula}
              onChangeText={setCedula}
            />
          </View>
          <View style={styles.twoColumnsContainer}>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. +52 3221573423"
              value={telefonoClinica}
              onChangeText={setTelefonoClinica}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <InputText
              style={styles.input}
              placeholder="Ej. clinica@gmail.com"
              value={emailClinica}
              onChangeText={setEmailClinica}
              keyboardType="email-address"
              autoCapitalize="none"
            />
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
  );
}