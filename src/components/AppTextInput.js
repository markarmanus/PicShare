import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import COLORS from "../config/Colors";
import { AppClickableIcon } from "./AppClickableIcon";

const AppTextInput = ({
  onChangeText,
  placeholder,
  containerStyle,
  textInputStyle,
  placeholderTextColor,
  onBlur,
  error,
  height = 30,
  warning,
  icon,
  defaultValue,
  ...props
}) => (
  <View style={styles.container}>
    <View style={[{ height }, styles.innerContainer, containerStyle]}>
      {icon ? (
        <View style={{ width: icon.size + 4 || 28 }}>
          <AppClickableIcon
            style={styles.iconStyle}
            color={placeholderTextColor}
            size={24}
            {...icon}
          />
        </View>
      ) : null}
      <TextInput
        placeholder={placeholder}
        style={[{ height }, styles.textInput, textInputStyle]}
        defaultValue={defaultValue}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />
    </View>

    {error ? <Text style={styles.error}>{error}</Text> : null}
    {warning && !error ? <Text style={styles.warning}>{warning}</Text> : null}
  </View>
);
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },
  innerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.default.lightGray,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  iconStyle: {
    width: "100%",
  },

  container: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 10,
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
