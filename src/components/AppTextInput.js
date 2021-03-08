import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

export const AppTextInput = ({
  onChangeText,
  placeholder,
  containerStyle,
  textInputStyle,
  onBlur,
  error,
  warning,
  defaultValue,
  ...props
}) => (
  <View style={[styles.container, containerStyle]}>
    <TextInput
      placeholder={placeholder}
      style={[styles.textInput, textInputStyle]}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...props}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
    {warning && !error ? <Text style={styles.warning}>{warning}</Text> : null}
  </View>
);
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderBottomWidth: 1,
    height: 30,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    height: 30,
    marginVertical: 15,
  },
  error: {
    fontSize: 13,
    marginTop: 2,
    color: "#ff0033",
  },
  warning: {
    fontSize: 13,
    marginTop: 2,
    color: "#ffae42",
  },
});
