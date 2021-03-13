import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "../components";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
import COLORS from "../config/Colors";

function Gallery() {
  const { setUser, user } = useContext(UserContext);
  const onLogout = () => {
    const afterLogout = () => {
      setUser(undefined);
    };
    amplifyApi.singOut(afterLogout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AppButton title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
  },
});
export { Gallery };
