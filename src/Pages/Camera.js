import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { AppCamera } from "../components";

function Camera({ navigation, ...props }) {
  return (
    <View style={styles.container}>
      {Platform.OS !== "web" ? (
        <AppCamera {...props.route.params} navigation={navigation} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export { Camera };
