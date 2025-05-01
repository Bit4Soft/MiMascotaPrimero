import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "../../../components/Layouts/Header";
import styles from "./EditDataPet.style";
import InputText from "../../../components/InputText/InputText";
import PetImagePicker from "../../../components/SelectImage/SelectImage";
import { formatExpedient } from "../../../utils/formatExpedient";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../database/firebase";

import { useNavigation } from "@react-navigation/native";

export default function EditDataPet() {
  const navigation = useNavigation();
  const [petImage, setPetImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const route = useRoute();
  const { petId } = route.params;

  const uploadImageAsync = async (uri, petId) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `pets/${petId}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return null;
    }
  };

  const [petData, setPetData] = useState({
    nombre: "",
    LFechap: date.toLocaleDateString([], { dateStyle: "medium" }),
    selectedTipoAnimal: null,
    selectedSexo: null,
    selectedRaza: null,
    expedienteClinico: "",
    senasParticulares: "",
    microchip: "",
    imageUrl: petImage,
    peso: "",
  });

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const docRef = doc(db, "Mascota", petId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPetImage(data.imageUrl || null);
          setDate(new Date(data.LFechap));
          setPetData({
            nombre: data.nombre,
            LFechap: data.LFechap,
            selectedTipoAnimal: data.selectedTipoAnimal,
            selectedSexo: data.selectedSexo,
            selectedRaza: data.selectedRaza,
            expedienteClinico: data.expedienteClinico,
            senasParticulares: data.senasParticulares,
            microchip: data.microchip,
            petImage: data.imageUrl,
            peso: data.peso,
          });
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, [petId]);

  const [errors, setErrors] = useState({});

  const handleImageSelected = (uri) => {
    setPetImage(uri);
    setPetData({ ...petData, petImage: uri });
    if (errors.petImage) {
      setErrors({ ...errors, petImage: null });
    }
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    Object.entries(petData).forEach(([key, value]) => {
      if (!value) {
        nuevosErrores[key] = "Por favor llena este campo";
      }
    });
    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const handleEditar = async () => {
    if (!validarCampos()) return;

    let imageUrl = petData.petImage;

    if (petImage && petImage !== petData.petImage) {
      const uploadedUrl = await uploadImageAsync(petImage, petId);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const petDataActualizada = {
      expedienteClinico: formatExpedient(petData.expedienteClinico),
      peso: petData.peso,
      senasParticulares: petData.senasParticulares,
      microchip: petData.microchip,
      imageUrl: imageUrl,
    };

    try {
      await updateDoc(doc(db, "Mascota", petId), petDataActualizada);
      Alert.alert("Éxito", "Los datos se actualizaron correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudieron actualizar los datos");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerWrapper}>
          <Header
            title="Datos de la Mascota"
            icon={require("../../../assets/icons/arrow-return.png")}
          />
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={styles.content}
          style={styles.scrollView}
        >
          <View style={styles.firstSectionContainer}>
            <View style={styles.imageContainer}>
              <PetImagePicker
                onImageSelected={handleImageSelected}
                initialImage={petImage}
              />
              {errors.petImage && (
                <Text style={styles.errorText}>{errors.petImage}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.text}>Nombre</Text>
              <InputText
                style={styles.input}
                placeholder="Hugo Montaño"
                editable={false}
                value={petData.nombre}
              />
              <Text style={styles.text}>Fecha de Nacimiento</Text>
              <InputText
                style={styles.input}
                editable={false}
                value={petData.LFechap}
              />
            </View>
          </View>

          <View style={styles.secondSectionContainer}>
            <Text style={styles.text}>Num. de expediente clínico</Text>
            <InputText
              style={[
                styles.input,
                errors.expedienteClinico && { borderColor: "red" },
              ]}
              placeholder="2025-04-12345"
              value={petData.expedienteClinico}
              keyboardType="numeric"
              onChangeText={(text) => {
                setPetData({
                  ...petData,
                  expedienteClinico: formatExpedient(text),
                });
                if (errors.expedienteClinico) {
                  setErrors({ ...errors, expedienteClinico: null });
                }
              }}
            />
            {errors.expedienteClinico && (
              <Text style={styles.errorText}>{errors.expedienteClinico}</Text>
            )}

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Tipo de animal</Text>
                <InputText
                  style={[
                    styles.input,
                    errors.nombre && { borderColor: "red" },
                  ]}
                  editable={false}
                  value={petData.selectedTipoAnimal}
                />

                <Text style={styles.text}>Raza</Text>

                <InputText
                  style={[
                    styles.input,
                    errors.nombre && { borderColor: "red" },
                  ]}
                  editable={false}
                  value={petData.selectedRaza}
                />
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>Sexo</Text>
                <InputText
                  style={[
                    styles.input,
                    errors.nombre && { borderColor: "red" },
                  ]}
                  editable={false}
                  value={petData.selectedSexo}
                />

                <Text style={styles.text}>Peso</Text>
                <InputText
                  style={[styles.input, errors.peso && { borderColor: "red" }]}
                  placeholder="20 kg"
                  value={petData.peso}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setPetData({ ...petData, peso: text });
                    if (errors.peso) setErrors({ ...errors, peso: null });
                  }}
                />
                {errors.peso && (
                  <Text style={styles.errorText}>{errors.peso}</Text>
                )}
              </View>
            </View>

            <Text style={styles.text}>Señas particulares</Text>
            <InputText
              style={[
                styles.input,
                errors.senasParticulares && { borderColor: "red" },
              ]}
              placeholder="Es blanquito con manchas negras"
              value={petData.senasParticulares}
              onChangeText={(text) => {
                setPetData({ ...petData, senasParticulares: text });
                if (errors.senasParticulares)
                  setErrors({ ...errors, senasParticulares: null });
              }}
            />
            {errors.senasParticulares && (
              <Text style={styles.errorText}>{errors.senasParticulares}</Text>
            )}

            <Text style={styles.text}>Microchip</Text>
            <InputText
              style={[styles.input, errors.microchip && { borderColor: "red" }]}
              placeholder="ID 2419401310302"
              value={petData.microchip}
              keyboardType="numeric"
              onChangeText={(text) => {
                setPetData({ ...petData, microchip: text });
                if (errors.microchip) setErrors({ ...errors, microchip: null });
              }}
            />
            {errors.microchip && (
              <Text style={styles.errorText}>{errors.microchip}</Text>
            )}

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleEditar}
            >
              <Text style={styles.continueButtonText}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
