import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View, TouchableOpacity } from "react-native";
import Header from "../../../components/Layouts/Header";
import styles from "./PeriodicReviews.style";
import { useNavigation } from "@react-navigation/native";

export default function PeriodicReviews() {
    const navigation = useNavigation();
    return( 
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style={styles.statusBar} />
            <View style={styles.headerWrapper}>
                <Header title="Revisiones Periodicas"
                 icon={require("../../../assets/icons/arrow-return.png")}
                  />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("NewDate")}> 
                    <Text style={styles.ButtonText}>
                        Agendar cita
                    </Text>
                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("PuppyVaccination")}> 
                    <Text style={styles.ButtonText}>
                        Citas Agendadas
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    );
}