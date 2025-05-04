import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../../components/Layouts/Header";
import styles from "./NewDate.style";
import InputText from "../../../components/InputText/InputText";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../database/firebase";
import CustomDropdown from "../../../components/Dropdown/DropDown";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";

export default function NewDate() {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingTimes, setFetchingTimes] = useState(false);

  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (route.params?.tipo) {
      setTipo(route.params.tipo);
    }
  }, [route.params?.tipo]);
  const allTimes = [
    { label: "08:00 AM", value: "08:00 AM" },
    { label: "09:00 AM", value: "09:00 AM" },
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "01:00 PM", value: "01:00 PM" },
    { label: "02:00 PM", value: "02:00 PM" },
    { label: "03:00 PM", value: "03:00 PM" },
    { label: "04:00 PM", value: "04:00 PM" },
  ];

  const fetchAvailableTimes = async (selectedDate) => {
    setFetchingTimes(true);
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const docRef = doc(db, "appointments", formattedDate);
      const snapshot = await getDoc(docRef);
      const reserved = snapshot.exists() ? snapshot.data().times : [];
      const filtered = allTimes.filter((t) => !reserved.includes(t.value));

      setAvailableTimes(filtered);
    } catch (error) {
    } finally {
      setFetchingTimes(false);
    }
  };

  useEffect(() => {
    fetchAvailableTimes(date);
  }, []);

  useEffect(() => {
    fetchAvailableTimes(date);
  }, [date]);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        Alert.alert("Error", "No puedes seleccionar una fecha pasada");
        return;
      }

      setDate(selectedDate);
      setSelectedTime(null);
    }
  };

  // Modifica la función saveAppointment:
  const saveAppointment = async () => {
    if (!selectedTime || !phone) {
      Alert.alert("Error", "Completa todos los campos requeridos.");
      return;
    }

    setLoading(true);

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const docRef = doc(db, "appointments", formattedDate);
      const citaId = `${formattedDate}_${selectedTime.value.replace(
        /[: ]/g,
        "_"
      )}`;

      // Verificar disponibilidad
      const snapshot = await getDoc(docRef);
      const reserved = snapshot.exists() ? snapshot.data().times : [];

      if (reserved.includes(selectedTime.value)) {
        Alert.alert("Error", "El horario ya está ocupado");
        return;
      }

      const citaData = {
        fecha: formattedDate,
        horario: selectedTime.value,
        telefono: phone,
        notas: notes,
        tipo: tipo,
        creadoEn: new Date(),
        estado: "pendiente",
      };

      const batch = writeBatch(db);

      batch.set(
        docRef,
        {
          times: arrayUnion(selectedTime.value),
        },
        { merge: true }
      );

      batch.set(doc(db, "citas", citaId), citaData);

      await batch.commit();

      Alert.alert("Éxito", "Cita agendada correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error completo:", error);
      Alert.alert(
        "Error",
        "No se pudo agendar la cita. Error: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <Header
        title="Cita Nueva"
        icon={require("../../../assets/icons/arrow-return.png")}
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Tipo de revisión</Text>
        </View>

        <InputText value={tipo} style={styles.input} editable={false} />

        <View style={styles.textContainer}>
          <Text style={styles.text}>Fecha</Text>
        </View>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={onChangeDate}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.date}
        >
          <Text style={styles.input}>
            {date.toLocaleDateString("es-MX", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          </Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Horario</Text>
        </View>
        <View style={styles.input}>
          {fetchingTimes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text style={styles.loadingText}>Cargando horarios...</Text>
            </View>
          ) : (
            <CustomDropdown
              items={availableTimes}
              placeholder={
                fetchingTimes
                  ? "Cargando..."
                  : availableTimes.length
                  ? "Selecciona un horario"
                  : "No hay horarios"
              }
              onSelect={(item) => setSelectedTime(item)}
              value={selectedTime}
              disabled={fetchingTimes || availableTimes.length === 0}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Teléfono</Text>
        </View>
        <InputText
          placeholder="Ej. +52 3224322944"
          value={phone}
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            setPhone(formatted);
          }}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>Notas (Opcional)</Text>
        </View>
        <InputText
          placeholder="Ej. Tiene fiebre desde la madrugada"
          value={notes}
          onChangeText={setNotes}
          style={styles.inputnotas}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.Button, loading && styles.disabledButton]}
          onPress={saveAppointment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.ButtonText}>Agendar cita</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
