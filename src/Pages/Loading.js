import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import IMAGES from "../../images";
import COLORS from "../config/Colors";

export default function Home({ user }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={IMAGES.LOGO} />
      <View style={styles.loadingIndicator}>
        <ActivityIndicator color={COLORS.default.mainColor} />
      </View>
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
