import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppButton } from "../components/AppButton";

export default function Welcome(props) {
  props.navigation.setOptions({
    headerShown: true,
    headerTransparent: true,
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../images/Logo.png")} />
      <Text style={styles.text}>WELCOME TO PicSHARE</Text>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => props.navigation.navigate("Signup")}
          title="Im New Here!"
        />
        <AppButton
          onPress={() => props.navigation.navigate("Login")}
          title="Login"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#183642",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  logo: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 60,
    width: "60%",
  },
});
