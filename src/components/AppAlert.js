import React from "react";
import { StyleSheet } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import COLORS from "../config/Colors";

const AppAlert = ({ alert }) => {
  return (
    <AwesomeAlert
      show={alert.show}
      showProgress={false}
      contentContainerStyle={styles.container}
      title={alert.title}
      message={alert.message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showConfirmButton={true}
      confirmText={alert.confirmText}
      confirmButtonColor={COLORS.default[alert.type]}
      onConfirmPressed={alert.confirmPress}
      {...alert}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    minHeight: 100,
    height: 300,
    width: 300,
  },
});
export { AppAlert };
