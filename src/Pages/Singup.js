import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import amplifyApi from "../API/AmplifyApi";

import { AppForm } from "../components/AppForm";

export default function Signup(props) {
  const [loading, setLoading] = useState(false);

  const onSignUp = () => {};
  const singUp = async () => {
    setLoading(true);
    await amplifyApi.singUp(email, password, props.onSignUp, (e) => {
      console.error(e);
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../images/Logo.png")} />
      <View style={styles.innerContainer}>
        <AppForm
          inputsToRender={{
            email: true,
            fullName: true,
            password: true,
          }}
          isLoading={loading}
          submitButtonText="Create Account"
          onSubmit={(data) => {
            console.log(data);
          }}
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
    justifyContent: "flex-start",
  },
  innerContainer: {
    width: 225,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
