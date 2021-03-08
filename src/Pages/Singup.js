import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import amplifyApi from "../API/AmplifyApi";
import { StackActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AwesomeAlert from "react-native-awesome-alerts";
import { AppForm } from "../components/AppForm";
import UserContext from "../contexts/user";
import IMAGES from "../../images";
import AMPLIFY_ERRORS from "../constants/AmplifyErrors";

export default function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const { user, setUser } = useContext(UserContext);
  const singUp = async (formData) => {
    const { email, password, fullName } = formData;
    setLoading(true);
    const onSignUpSuccess = (res) => {
      setUser({
        email,
        fullName,
        emailValidated: false,
        userId: res.userSub,
      });
      props.navigation.dispatch(StackActions.replace("ValidateEmail"));
    };
    const onSingUpFail = (error) => {
      if (error.name === AMPLIFY_ERRORS.EMAIL_EXISTS) {
        const alert = {
          show: true,
          title: "Email Already Exists!",
          message: "Try Logging in with this email",
          confirmText: "Okay",
          confirmButtonColor: "red",
          confirmPress: () => {
            setAlert({ show: false });
          },
        };
        setAlert(alert);
      } else {
        const alert = {
          show: true,
          title: "Something Went Wrong!",
          message: "Try using a different email or password.",
          confirmText: "Okay",
          confirmButtonColor: "red",
          confirmPress: () => {
            setAlert({ show: false });
          },
        };
        setAlert(alert);
      }
    };
    await amplifyApi.singUp(
      email,
      password,
      { "custom:FullName": fullName },
      onSignUpSuccess,
      onSingUpFail
    );
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={100}
      style={styles.keyboardAvoiding}
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={IMAGES.LOGO} />
        <View style={styles.innerContainer}>
          <AppForm
            inputsToRender={{
              email: true,
              fullName: true,
              password: true,
            }}
            defaultValues={{
              email: user?.email,
              fullName: user?.fullName,
            }}
            isLoading={loading}
            submitButtonText="Create Account"
            onSubmit={singUp}
          />
          <AwesomeAlert
            show={alert.show}
            showProgress={false}
            title={alert.title}
            message={alert.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText={alert.confirmText}
            confirmButtonColor={alert.confirmButtonColor}
            onConfirmPressed={alert.confirmPress}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  keyboardAvoiding: {
    backgroundColor: "#EAEAEA",
  },
});
