import React from "react";
import { TextInput } from "react-native";
import styles from "./InputText.styles"

export default function InputText({ style, ...props }) {
    return (
      <TextInput
        style={[styles.Input, style]}
        {...props}
      />
    );
  }