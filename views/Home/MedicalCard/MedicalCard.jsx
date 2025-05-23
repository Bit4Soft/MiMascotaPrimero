import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../../../components/Layouts/Header";
import styles from "./MedicalCard.style";
import InputText from "../../../components/InputText/InputText";
import DateTimePicker from "@react-native-community/datetimepicker";
import PetImagePicker from "../../../components/SelectImage/SelectImage";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  RazasPerros,
  RazasGatos,
  Sexos,
  TipoAnimal,
} from "../../../constants/pet";

import CustomDropdown from "../../../components/Dropdown/DropDown";
import { formatExpedient } from "../../../utils/formatExpedient";

export default function MedicalCard() {
  const navigation = useNavigation();
  const [petImage, setPetImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [petData, setPetData] = useState({
    nombre: "",
    LFechap: date.toLocaleDateString([], { dateStyle: "medium" }),
    selectedTipoAnimal: null,
    selectedSexo: null,
    selectedRaza: null,
    expedienteClinico: "",
    senasParticulares: "",
    microchip: "",
    petImage: petImage,
    peso: "",
  });

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

  const handleContinue = () => {
    const petDataFormateada = {
      ...petData,
      expedienteClinico: formatExpedient(petData.expedienteClinico),
    };

    if (!validarCampos()) return;

    navigation.navigate("Othersdata", {
      petData: petDataFormateada,
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDataPicker = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea}>
        <View >
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

              {petImage && (
                <Image
                  source={{ uri: petImage }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              )}
              {errors.petImage && (
                <Text style={styles.errorText}>{errors.petImage}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.text}>Nombre</Text>
              <InputText
                style={[styles.input, errors.nombre && { borderColor: "red" }]}
                placeholder="Hugo Montaño"
                value={petData.nombre}
                onChangeText={(text) => {
                  setPetData({ ...petData, nombre: text });
                  if (errors.nombre) setErrors({ ...errors, nombre: null });
                }}
              />
              {errors.nombre && (
                <Text style={styles.errorText}>{errors.nombre}</Text>
              )}
              <Text style={styles.text}>Fecha de Nacimiento</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={showDataPicker}
              >
                <Text style={styles.dateButtonText}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
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
                <CustomDropdown
                  items={TipoAnimal}
                  value={petData.selectedTipoAnimal}
                  placeholder="Selecciona tipo"
                  onSelect={(item) => {
                    setPetData({ ...petData, selectedTipoAnimal: item.value });
                    if (errors.selectedTipoAnimal)
                      setErrors({ ...errors, selectedTipoAnimal: null });
                  }}
                  style={[
                    styles.dropdown,
                    errors.selectedTipoAnimal && { borderColor: "red" },
                  ]}
                />
                {errors.selectedTipoAnimal && (
                  <Text style={styles.errorText}>
                    {errors.selectedTipoAnimal}
                  </Text>
                )}

                <Text style={styles.text}>Raza</Text>
                <CustomDropdown
                  items={
                    petData.selectedTipoAnimal === "Perro"
                      ? RazasPerros
                      : RazasGatos
                  }
                  value={petData.selectedRaza}
                  placeholder="Selecciona raza"
                  onSelect={(item) => {
                    setPetData({ ...petData, selectedRaza: item.value });
                    if (errors.selectedRaza)
                      setErrors({ ...errors, selectedRaza: null });
                  }}
                  style={[
                    styles.dropdown,
                    errors.selectedRaza && { borderColor: "red" },
                  ]}
                />
                {errors.selectedRaza && (
                  <Text style={styles.errorText}>{errors.selectedRaza}</Text>
                )}
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>Sexo</Text>
                <CustomDropdown
                  items={Sexos}
                  value={petData.selectedSexo}
                  placeholder="Selecciona sexo"
                  onSelect={(item) => {
                    setPetData({ ...petData, selectedSexo: item.value });
                    if (errors.selectedSexo)
                      setErrors({ ...errors, selectedSexo: null });
                  }}
                  style={[
                    styles.dropdown,
                    errors.selectedSexo && { borderColor: "red" },
                  ]}
                />
                {errors.selectedSexo && (
                  <Text style={styles.errorText}>{errors.selectedSexo}</Text>
                )}

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
