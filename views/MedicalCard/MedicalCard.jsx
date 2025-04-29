import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./MedicalCard.style";
import InputText from "../../components/InputText/InputText";
import PetImagePicker from "../../components/SelectImage/SelectImage";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  RazasPerros,
  RazasGatos,
  Sexos,
  TipoAnimal,
} from "../../constants/pet";

import CustomDropdown from "../../components/Dropdown/DropDown";
import { formatExpedient } from "../../utils/formatExpedient";

export default function MedicalCard() {
  //Variable para la navegacion
  const navigation = useNavigation();

  // Estado para la imagen de la mascota
  const [petImage, setPetImage] = useState(null);

  // Estado para los datos de la mascota
  const [petData, setPetData] = useState({
    nombre: "",
    fechaNacimiento: "",
    selectedTipoAnimal: null,
    selectedSexo: null,
    selectedRaza: null,
    expedienteClinico: "",
    senasParticulares: "",
    microchip: "",
    petImage: null,
    peso: "",
  });

  //UseEffect para manejar el cambio de raza
  useEffect(() => {
    setPetData((prev) => ({ ...prev, selectedRaza: "" }));
  }, [petData.selectedTipoAnimal]);

  // Funcion para guardar la imagen seleccionada en el estado
  const handleImageSelected = (uri) => {
    setPetImage(uri);
  };

  const handleContinue = () => {
    const { nombre, selectedTipoAnimal, selectedSexo } = petData;
    if (!nombre || !selectedTipoAnimal || !selectedSexo) {
      Alert.alert(
        "Campos requeridos",
        "Por favor complete los campos obligatorios: Nombre, Tipo de animal y Sexo",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("Othersdata", {
      petData: {
        nombre: petData.nombre,
        fechaNacimiento: petData.fechaNacimiento,
        tipoAnimal: petData.selectedTipoAnimal,
        sexo: petData.selectedSexo,
        raza: petData.selectedRaza,
        expediente: petData.expedienteClinico,
        senasParticulares: petData.senasParticulares,
        microchip: petData.microchip,
        petImage: petData.petImage,
        peso: petData.peso,
      },
    });
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
            icon={require("../../assets/icons/arrow-return.png")}
          />
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={styles.content}
          style={styles.scrollView}
        >
          {/* Primera sección de dos columnas (Imagen + Datos básicos) */}
          <View style={styles.firstSectionContainer}>
            <View style={styles.imageContainer}>
              <PetImagePicker onImageSelected={handleImageSelected} />
              {petImage && (
                <Image
                  source={{ uri: petImage }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.text}>Nombre</Text>
              <InputText
                style={styles.input}
                placeholder="Hugo Montaño"
                value={petData.nombre}
                keyboardType="default"
                onChangeText={(text) =>
                  setPetData({ ...petData, nombre: text })
                }
              />
              <Text style={styles.text}>Fecha de Nacimiento</Text>
              <InputText
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={petData.fechaNacimiento}
                onChangeText={(text) =>
                  setPetData({ ...petData, fechaNacimiento: text })
                }
              />
            </View>
          </View>
          {/* Segunda sección de dos columnas (Tipo de animal + Sexo) */}
          <View style={styles.secondSectionContainer}>
            <Text style={styles.text}>Num. de expediente clinio</Text>
            <InputText
              style={styles.input}
              placeholder="2025-04-12345"
              value={petData.expedienteClinico}
              keyboardType="numeric"
              onChangeText={(text) =>
                setPetData({
                  ...petData,
                  expedienteClinico: formatExpedient(text),
                })
              }
            />
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Tipo de animal</Text>
                <CustomDropdown
                  items={TipoAnimal}
                  value={petData.selectedTipoAnimal}
                  placeholder="Selecciona tipo"
                  onSelect={(item) =>
                    setPetData({
                      ...petData,
                      selectedTipoAnimal: item.value,
                    })
                  }
                  style={styles.dropdown}
                />

                <Text style={styles.text}>Raza</Text>
                <CustomDropdown
                  items={
                    petData.selectedTipoAnimal === "perro"
                      ? RazasPerros
                      : RazasGatos
                  }
                  value={petData.selectedRaza}
                  placeholder="Selecciona tipo"
                  onSelect={(text) =>
                    setPetData({ ...petData, selectedRaza: text })
                  }
                  style={styles.dropdown}
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>Sexo</Text>
                <CustomDropdown
                  items={Sexos}
                  value={petData.selectedSexo}
                  placeholder="Selecciona tipo"
                  onSelect={(text) =>
                    setPetData({ ...petData, selectedSexo: text })
                  }
                  style={styles.dropdown}
                />

                <Text style={styles.text}>Peso</Text>
                <InputText
                  style={styles.input}
                  placeholder="20 kg"
                  keyboardType="numeric"
                  value={petData.peso}
                  onChangeText={(text) =>
                    setPetData({ ...petData, peso: text })
                  }
                />
              </View>
            </View>
            <Text style={styles.text}>Señas particulares</Text>
            <InputText
              style={styles.input}
              placeholder="Es blanquito con manchas negras"
              value={petData.senasParticulares}
              onChangeText={(text) =>
                setPetData({ ...petData, senasParticulares: text })
              }
            />
            <Text style={styles.text}>Microchip</Text>
            <InputText
              style={styles.input}
              placeholder="ID 2419401310302"
              keyboardType="numeric"
              value={petData.microchip}
              onChangeText={(text) =>
                setPetData({ ...petData, microchip: text })
              }
            />
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
