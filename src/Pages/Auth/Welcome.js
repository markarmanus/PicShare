import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppButton } from "../../components";
import IMAGES from "../../../images";
import COLORS from "../../config/Colors";

function Welcome(props) {
  const onSignUp = () => {
    props.navigation.navigate("Signup");
  };
  const onLogin = () => {
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.logo} source={IMAGES.LOGO} />
      <Text style={styles.text}>WELCOME TO PicSHARE</Text>
      <View style={styles.buttonContainer}>
        <AppButton onPress={onSignUp} title="Im New Here!" />
        <AppButton onPress={onLogin} title="Login" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: COLORS.default.mainColor,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 250,
    marginVertical: 30,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 60,
    width: "60%",
  },
});
export { Welcome };
