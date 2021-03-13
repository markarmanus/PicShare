import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../config/Colors";

function Camera({}) {
  return (
    <View style={styles.container}>
      <Text>Camera</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 150,
  },
  logo: {
    width: 300,
    height: 300,
  },
  loadingIndicator: {
    width: "10%",
    height: "10%",
    alignSelf: "center",
  },
});
export { Camera };
