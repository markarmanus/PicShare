import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {AppButton} from "../components"
function Profile(props) {
  return (
    <View style={styles.container}>
        <AppButton
          onPress={() => {
            props.onLogout()
          }}
          title={"Logout"}
        />      
        <Text>{JSON.stringify(props)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5497A7",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 150,
  },
  logo: {
    width: 300,
    height: 300,
  },
  loadingIndicator: {
    width: "10%",
    height: "10%",
    alignSelf: "center",
  },
});
export { Profile };
