import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../config/Colors";
import { AppCamera } from "../components";

function Camera({ navigation, ...props }) {
  console.log(props);
  return (
    <View style={styles.container}>
      <AppCamera {...props.route.params} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export { Camera };
