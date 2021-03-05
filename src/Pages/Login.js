import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import amplifyApi from "../API/AmplifyApi";

import { AppForm } from "../components/AppForm";

export default function Login(props) {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    await amplifyApi.signIn(email, password, props.onLogin, (e) => {
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
            fullName: false,
            password: true,
          }}
          validateLoginOnly={true}
          isLoading={loading}
          submitButtonText="Login"
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
