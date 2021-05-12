import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import amplifyApi from "../../API/AmplifyApi";
import { AppForm, AppAlert } from "../../components";
import UserContext from "../../contexts/user";
import IMAGES from "../../../images";
import { AMPLIFY_ERRORS } from "../../constants/";
import COLORS from "../../config/Colors";
import { Toast } from "../../helpers/nativeImports";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const { setUser, user } = useContext(UserContext);

  const onLogin = async (formData) => {
    setLoading(true);

    const { email, password } = formData;
    const onLoginSuccess = () => {
      props.navigation.popToTop();
    };

    const onLoginFail = (error) => {
      if (error.name === AMPLIFY_ERRORS.USER_NOT_CONFIRMED) {
        const alert = {
          show: true,
          title: "Email Verification!",
          message: "You Need to verify your email",
          confirmText: "Verify",
          type: "success",
          confirmPress: () => {
            amplifyApi.resendConfirmationCode(email);
            props.navigation.navigate("ValidateEmail");
            setAlert({ show: false });
          },
        };
        setAlert(alert);
      } else if (error.name === AMPLIFY_ERRORS.USER_NOT_AUTHORIZED) {
        Toast.show("The Email or password are incorrect!");
      }
    };
    await amplifyApi.signIn(email, password, onLoginSuccess, onLoginFail);
    setUser({ email });
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={100}
      style={styles.keyboardAvoiding}
    >
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.logo} source={IMAGES.LOGO} />
        <View style={styles.innerContainer}>
          <AppForm
            inputsToRender={{
              email: true,
              fullName: false,
              password: true,
            }}
            validateLoginOnly={true}
            defaultValues={{
              email: user?.email,
            }}
            isLoading={loading}
            submitButtonText="Login"
            onSubmit={onLogin}
          />
          <AppAlert alert={alert} />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    width: 225,
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginVertical: 30,
  },
  keyboardAvoiding: {
    backgroundColor: COLORS.default.background,
  },
});
export { Login };
