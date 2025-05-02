import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./VaccineGiven.style";

const VaccineGiven = ({ vacuna, index }) => {
  return (
    <View style={styles.contentVaccine}>
      <View style={styles.column}>
        <View style={styles.contentData}>
          <Text style={styles.titleText}>✅ Vacuna {index + 1}:</Text>
          <Text style={styles.dataText}>{vacuna.nombreVacuna}</Text>
        </View>
        <View style={styles.contentData}>
          <Text style={styles.titleText}>🗓 Fecha:</Text>
          <Text style={styles.dataText}>
            {new Date(vacuna.fecha).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Image
        source={require("../../assets/success.png")}
        style={styles.image}
      />
    </View>
  );
};

export default VaccineGiven;
