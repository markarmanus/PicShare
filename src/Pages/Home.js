import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AppButton } from "../components/AppButton";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
export default class Home extends React.Component {
  static contextType = UserContext;
  onLogout = () => {
    const { setUser } = this.context;
    const afterLogout = () => {
      setUser(undefined);
    };
    amplifyApi.singOut(afterLogout);
  };

  render() {
    const { user } = this.context;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {user?.fullName ? <Text>{user.fullName}</Text> : null}
        <View
          style={{
            width: "50%",
          }}
        >
          <AppButton title="Logout" onPress={this.onLogout} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
