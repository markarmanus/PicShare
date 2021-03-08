import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import amplifyApi from "../API/AmplifyApi";
import { StackActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppForm } from "../components/AppForm";
import UserContext from "../contexts/user";
import IMAGES from "../../images";
import AMPLIFY_ERRORS from "../constants/AmplifyErrors";
import COLORS from "../config/Colors";

let Toast;
if (Platform.OS !== "web") {
  Toast = require("react-native-simple-toast").default;
}

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
        Toast.show("Email Already Exists!");
      } else {
        Toast.show("Could Not Login, SomeThing Went Wrong!");
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
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.background,
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
    backgroundColor: COLORS.default.background,
  },
});
