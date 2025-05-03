import React from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View, TouchableOpacity } from "react-native";
import Header from "../../components/Layouts/Header";
import styles from "./Menu.style";

const MenuScreen = ({ 
  title = "Menú Principal",
  headerIcon = require("../../assets/icons/arrow-return.png"),
  buttons = [],
  navigation 
}) => {
  return ( 
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={styles.statusBar} />
      <View style={styles.headerWrapper}>
        <Header 
          title={title}
          icon={headerIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {buttons.map((button, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.Button, button.style]}
            onPress={button.onPress}
          > 
            <Text style={styles.ButtonText}>
              {button.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;