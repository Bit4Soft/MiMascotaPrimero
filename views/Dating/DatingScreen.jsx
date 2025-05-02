import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View, TouchableOpacity, Image } from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./DatingScreen.style";
import { useNavigation } from "@react-navigation/native";


export default function DatingScreen() {
  
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View>
        <Header title="Citas" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
       
        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("Revisiones")}> 
          <Text style={styles.ButtonText}>
            Revisiones Periodicas
          </Text>
          <Text styles={styles.ButtonText2}>
            {">"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => console.log("Cachorros")}> 
          <Text style={styles.ButtonText}>
            Registro de vac. cachorro
          </Text>
          <Text styles={styles.ButtonText2}>
            {">"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button} onPress={() => console.log("RegistroVac")}> 
          <Text style={styles.ButtonText}>
            Registro de vacunaciones
          </Text>
          <Text styles={styles.ButtonText2}>
            {">"}
          </Text>
        </TouchableOpacity> 
               <TouchableOpacity style={styles.Button} onPress={() => console.log("Externa")}> 
          <Text style={styles.ButtonText}>
            Prog. desparacitacion externa  
          </Text>
          <Text styles={styles.ButtonText2}>
            {">"}
          </Text>
        </TouchableOpacity> 
        
         <TouchableOpacity style={styles.Button} onPress={() => console.log("Interna")}> 
          <Text style={styles.ButtonText}>
          Prog. desparacitacion interna 
          </Text>
          <Text styles={styles.ButtonText2}>
            {">"}
          </Text>
        </TouchableOpacity>
        <View>
        <Image
              style={styles.image}
              source={require("../../assets/icons/cita.png")}
            />
          </View>
                
      </ScrollView>
    </SafeAreaView>
  );
}
