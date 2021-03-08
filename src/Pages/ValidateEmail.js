import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import amplifyApi from "../API/AmplifyApi";

import { AppButton } from "../components/AppButton";
import { AppTextInput } from "../components/AppTextInput";
import { Link, StackActions } from "@react-navigation/native";
import UserContext from "../contexts/user";
import transformers from "../helpers/transformers";

export default function ValidateEmail(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const { user, setUser } = useContext(UserContext);
  const validateEmail = async () => {
    setLoading(true);
    await amplifyApi.validateEmail(
      user.email ? user.email : "",
      validationCode,
      () => {
        setLoading(false);
        setUser({
          ...user,
          emailValidated: true,
        });
        alert("Email Validated Successfully. Now Lets Login!");
        props.navigation.dispatch(StackActions.replace("Login"));
      },
      (e) => {
        setLoading(false);
        setError("Code Is Incorrect!");
      }
    );
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../images/Logo.png")} />

      <View style={styles.innerContainer}>
        <Text style={styles.explainText}>
          We've sent an email with your code to
        </Text>
        <Text>{user.email ? user.email : "CouldNotGetEmail"}</Text>

        <AppTextInput
          placeholder="Validation Code"
          error={error}
          onChangeText={setValidationCode}
        />
        <AppButton
          onPress={validateEmail}
          disabled={validationCode.length === 0}
          isLoading={loading}
          title={"Verify"}
        />
        <Text style={styles.explainText}>
          Did not Recieve email? <Link style={styles.link}>Resend</Link>
        </Text>
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },

  explainText: {
    textAlign: "center",
    marginBottom: 5,
  },
  link: {
    color: "#3366BB",
  },
});
