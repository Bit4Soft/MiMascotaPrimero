import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Header from "../../components/Layouts/Header";
import PolaroidCard from "../../components/CardsHome/CardAddPet";
import styles from "./HomeScreen.style";
import CardPet from "../../components/CardsHome/CardPet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebase";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Mascota"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();

  const handleAddCard = () => {};
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header title="Cartilla Veterinaria" />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#355E49" />
      ) : pets.length === 0 ? (
        <View style={styles.content}>
          <Text style={styles.text}>¡Bienvenido a tu cartilla!</Text>
          <PolaroidCard onPress={handleAddCard} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.content}
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.content}>
              <Text style={styles.text}>¡Bienvenido!</Text>
              <CardPet
                nombre={item.nombre}
                imageUrl={item.imageUrl}
                onPress={() =>
                  navigation.navigate("EditDataPet", { petId: item.id })
                }
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
