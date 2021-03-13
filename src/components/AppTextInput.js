import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import COLORS from "../config/Colors";

const AppTextInput = ({
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
    borderBottomColor: COLORS.default.lightGray,
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
    color: COLORS.default.error,
  },
  warning: {
    fontSize: 13,
    marginTop: 2,
    color: COLORS.default.warning,
  },
});
export { AppTextInput };
