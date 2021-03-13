import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "./AppButton";
import { AppTextInput } from "./AppTextInput";

const AppForm = ({
  inputsToRender,
  isLoading,
  submitButtonText,
  validateLoginOnly,
  defaultValues,
  onSubmit,
}) => {
  const [email, setEmail] = useState(defaultValues.email || "");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(defaultValues.fullName || "");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [fullNameValid, setFullNameValid] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  useEffect(() => {
    if (defaultValues.email) validateEmail();
    if (defaultValues.password) validatePassword();
    if (defaultValues.fullName) validateFullName();
  }, []);

  const validateEmail = () => {
    const regTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && regTest.test(email.toLowerCase())) {
      setEmailValid(true);
      setEmailError("");
    } else {
      setEmailValid(false);
      setEmailError("Please Enter a Valid Email!");
    }
  };

  const validatePassword = () => {
    const hasLowerCase = new RegExp("^(?=.*[a-z])");
    const hasUpperCase = new RegExp("^(?=.*[A-Z])");
    const hasNumber = new RegExp("^(?=.*[0-9])");
    const isLongEnough = new RegExp("^(?=.{8,})");
    if (isLongEnough.test(password)) {
      setPasswordValid(true);
      setPasswordError("");
      setPasswordWarning("");

      if (!hasUpperCase.test(password)) {
        setPasswordWarning("Password is weak! - add an upper case letter!");
      }
      if (!hasNumber.test(password)) {
        setPasswordWarning(
          "Password is weak! - add a number to your password!"
        );
      }
      if (!hasLowerCase.test(password)) {
        setPasswordWarning("Password is weak! - add a lower case letter!");
      }
    } else {
      setPasswordValid(false);
      setPasswordWarning("");
      setPasswordError("Password Not Long Enough!");
    }
  };
  const validateFullName = () => {
    const isValid = fullName && fullName.length > 0;
    if (isValid) {
      setFullNameValid(true);
      setFullNameError("");
    } else {
      setFullNameValid(false);
      setFullNameError("Please Enter Your Full Name");
    }
  };

  const isValidEmail = emailValid || !inputsToRender.email;
  const isValidPassword = passwordValid || !inputsToRender.password;
  const isValidFullName = fullNameValid || !inputsToRender.fullName;
  let canContinue;
  if (validateLoginOnly) {
    canContinue = isValidEmail && password.length > 0;
  } else {
    canContinue = isValidEmail && isValidFullName && isValidPassword;
  }

  return (
    <View style={styles.container}>
      {inputsToRender.fullName ? (
        <AppTextInput
          placeholder="Full Name"
          error={fullNameError}
          onChangeText={setFullName}
          defaultValue={defaultValues.fullName}
          onBlur={() => {
            if (!validateLoginOnly) validateFullName();
          }}
        />
      ) : null}
      {inputsToRender.email ? (
        <AppTextInput
          placeholder="Email"
          error={emailError}
          onChangeText={setEmail}
          defaultValue={defaultValues.email}
          onBlur={() => validateEmail()}
        />
      ) : null}
      {inputsToRender.password ? (
        <AppTextInput
          placeholder="Password"
          error={passwordError}
          warning={passwordWarning}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(password) => {
            setPassword(password);
            if (!validateLoginOnly) validatePassword();
          }}
        />
      ) : null}

      <AppButton
        containerStyle={styles.buttonContainer}
        onPress={() => {
          if (!isLoading) onSubmit({ email, password, fullName });
        }}
        disabled={!canContinue}
        isLoading={isLoading}
        title={submitButtonText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 30,
    width: "90%",
  },
});
export { AppForm };
