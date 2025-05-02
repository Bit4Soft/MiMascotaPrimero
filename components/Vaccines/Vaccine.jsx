import { Text, Image, View } from "react-native";
import styles from "./Vacine.style";
import React from "react";

const Vaccine = ({ data, index }) => {
  return (
    <View style={styles.contentVaccine}>
      <View style={styles.contentImage}>
        <Image
          source={require("../../assets/icons/vaccine.png")}
          style={styles.imageVaccine}
        />
      </View>
      <View style={styles.contentData}>
        <View style={styles.contentText}>
          <Text style={styles.dataText}>
            <Text style={styles.titleText}>Vacuna {index + 1}:</Text>{" "}
            {data.nombre}
          </Text>
        </View>
        <View style={styles.contentText}>
          <Text style={styles.dataText}>
            <Text style={styles.titleText}>Edad:</Text> {data.edad}
          </Text>
        </View>
        <View style={styles.contentText}>
          <Text style={styles.dataText}>
            <Text style={styles.titleText}>Dosis:</Text> {data.dosis}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Vaccine;
