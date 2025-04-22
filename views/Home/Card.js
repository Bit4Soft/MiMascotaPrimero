import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './HomeScreen.style'; // Ajusta la ruta según tu estructura
import { useNavigation } from '@react-navigation/native';

const PolaroidCard = ({ 
  title = 'Agregar Cartilla', 
  description = 'Presiona para agregar una nueva cartilla', 
  imageSrc = null,
  onPress 
  
}) => {
  const navigation = useNavigation();
  return (
    
    <TouchableOpacity onPress={() => navigation.navigate('Cartilla')} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image 
          source={imageSrc ? { uri: imageSrc } : require('../../assets/icons/plus.png')} 
          style={styles.image} 
          
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PolaroidCard