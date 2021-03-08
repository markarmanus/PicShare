import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import COLORS from "../config/Colors";

export const AppButton = ({
  onPress,
  title,
  containerStyle,
  textStyle,
  isLoading,
  disabled,
}) => {
  const finalContainerStyle = [styles.container, containerStyle];
  if (disabled) finalContainerStyle.push(styles.disabledContainer);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={(e) => {
        if (!disabled) onPress(e);
      }}
      style={finalContainerStyle}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="small"
          color={COLORS.default.lightFont}
        />
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.default.mainColor,
    margin: 10,
    width: "100%",
    height: 40,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  disabledContainer: {
    opacity: 0.3,
  },
  text: {
    fontSize: 13,
    color: COLORS.default.lightFont,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  loadingIndicator: {
    width: "20%",
    height: "20%",
    alignSelf: "center",
  },
});
