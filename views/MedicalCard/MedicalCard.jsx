import React, { useState } from "react";
import { SafeAreaView, Text, ScrollView, View, Image,TouchableOpacity, Alert } from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./MedicalCard.style";
import InputText from "../../components/InputText/InputText";
import PetImagePicker from "../../components/SelectImage/SelectImage";
import CustomDropdown from "../../components/Dropdown/DropDown";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MedicalCard() {
  const navigation = useNavigation(); 
  const [selectedTipoAnimal, setSelectedTipoAnimal] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [selectedRaza, setSelectedRaza] = useState(null);
  const [petImage, setPetImage] = useState(null);
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [expediente, setExpediente] = useState("");
  const [senasParticulares, setSenasParticulares] = useState("");
  const [microchip, setMicrochip] = useState("");

  const TipoAnimal = [
    { label: 'Perro', value: 'perro' },
    { label: 'Gato', value: 'gato' },
  ];

  const Sexos = [
    { label: 'Macho', value: 'macho' },
    { label: 'Hembra', value: 'hembra' },
  ];

  const Razas = [
    { label: 'Labrador', value: 'labrador' },
    { label: 'Bulldog', value: 'bulldog' },
    { label: 'Persa', value: 'persa' },
  ];



  const handleImageSelected = (uri) => {
    setPetImage(uri);
  };
  
  const handleContinue = () => {
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
        nombre,
        fechaNacimiento,
        tipoAnimal: selectedTipoAnimal,
        sexo: selectedSexo,
        raza: selectedRaza,
        expediente,
        senasParticulares,
        microchip,
        petImage
      }
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <Header title="Datos de la Mascota" />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.content}
        style={styles.scrollView}
      >
        {/* Primera sección de dos columnas (Imagen + Datos básicos) */}
        <View style={styles.twoColumnContainer}>
          <View style={styles.column}>
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
          </View>
          
          <View style={styles.columnSpacer} />
          
          <View style={[styles.column, styles.formContainer]}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <InputText 
                placeholder="Nombre de tu mascota" 
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <InputText 
                placeholder="DD/MM/AAAA"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        {/* Input de expediente clínico (ancho completo) */}
        <View style={styles.fullWidthContainer}>
          <Text style={styles.label}>Num. de Expediente Clínico</Text>
          <InputText
            placeholder="ID 20268426826486"
            value={expediente}
            onChangeText={setExpediente}
            style={styles.input}
          />
        </View>

        {/* Segunda sección de dos columnas */}
        <View style={styles.twoColumnContainer}>
          <View style={styles.column}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de animal</Text>
              <CustomDropdown
                items={TipoAnimal}
                value={selectedTipoAnimal}
                placeholder="Selecciona tipo"
                onSelect={setSelectedTipoAnimal}
                style={styles.dropdown}
              />
            </View>
          </View>
          
          <View style={styles.columnSpacer} />
          
          <View style={styles.column}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Sexo</Text>
              <CustomDropdown
                items={Sexos}
                value={selectedSexo}
                placeholder="Selecciona sexo"
                onSelect={setSelectedSexo}
                style={styles.dropdown}
              />
            </View>
          </View>
        </View>

        {/* Tercera sección de dos columnas */}
        <View style={styles.twoColumnContainer}>
          <View style={styles.column}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Raza</Text>
              <CustomDropdown
                items={Razas}
                value={selectedRaza}
                placeholder="Selecciona raza"
                onSelect={setSelectedRaza}
                style={styles.dropdown}
              />
            </View>
          </View>
          
          <View style={styles.columnSpacer} />
          
          <View style={styles.column}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Peso (kg)</Text>
              <InputText
                placeholder="Ej. 20"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>
        </View>

        <View style={styles.fullWidthContainer}>
          <Text style={styles.label}>Señas particulares</Text>
          <InputText
            placeholder="Describa características físicas"
            value={senasParticulares}
            onChangeText={setSenasParticulares}
            style={[styles.input, styles.multilineInput]}
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.fullWidthContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>No. ID microchip</Text>
              <InputText
                placeholder="ID 20023443"
                value={microchip}
                onChangeText={setMicrochip}
                style={styles.input}
              />
            </View>
            <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
        </View>
        {/* Última sección de dos columnas */}
      </ScrollView>
    </SafeAreaView>
  );}
