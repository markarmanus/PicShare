import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import amplifyApi from "../../API/AmplifyApi";

import { AppButton, AppTextInput } from "../../components";
import { StackActions } from "@react-navigation/native";
import UserContext from "../../contexts/user";
import COLORS from "../../config/Colors";
import IMAGES from "../../../images";
import { Toast } from "../../helpers/nativeImports";

function ValidateEmail(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const { user, setUser } = useContext(UserContext);
  const validateEmail = async () => {
    setLoading(true);
    await amplifyApi.validateEmail(
      user.email || "",
      validationCode,
      () => {
        setLoading(false);
        setUser({
          ...user,
          emailValidated: true,
        });
        Toast.show("Email Validated Successfully. Now Lets Login!");
        props.navigation.dispatch(StackActions.replace("Login"));
      },
      (e) => {
        setLoading(false);
        setError("Code Is Incorrect!");
      }
    );
  };
  const resendCode = () => {
    if (user?.email)
      amplifyApi.resendConfirmationCode(
        user.email,
        () => {
          Toast.show("Email Sent!");
        },
        (e) => {
          console.log(e);
        }
      );
  };
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.logo} source={IMAGES.LOGO} />

      <View style={styles.innerContainer}>
        <Text style={styles.explainText}>
          We've sent an email with your code to
        </Text>
        <Text>{user.email || "CouldNotGetEmail"}</Text>

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
          Did not Receive email?{" "}
          <Text style={styles.link} onPress={resendCode}>
            Resend
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.background,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  innerContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginVertical: 30,
  },

  explainText: {
    textAlign: "center",
    marginBottom: 5,
  },
  link: {
    color: COLORS.default.link,
  },
});
export { ValidateEmail };
