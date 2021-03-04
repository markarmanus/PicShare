import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Amplify, { Auth, Cache } from "aws-amplify";
import awsconfig from "./aws-exports";
import axios from "axios";
import Signup from "./src/Pages/Singup";
import Login from "./src/Pages/Login";
import Home from "./src/Pages/Home";
Amplify.configure(awsconfig);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);

  const checkIfLoggedIn = async () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        const data = JSON.stringify({
          token: user.signInUserSession.idToken.jwtToken,
        });
        const headers = {
          "Content-Type": "application/json",
        };
        axios
          .post("http://localhost:5000/user/verify", data, {
            headers,
          })
          .then((res) => {
            setUser(res.data);
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    checkIfLoggedIn();
  }, [loading]);
  const ifLoading = (
    <View>
      <Text>Loading</Text>
    </View>
  );
  const home = <Home user={user} />;
  const signUp = <Login />;
  return loading ? ifLoading : user ? home : signUp;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
