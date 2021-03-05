import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import Login from "./src/Pages/Login";
import Loading from "./src/Pages/Loading";
import Home from "./src/Pages/Home";
import Welcome from "./src/Pages/Welcome";
import amplifyApi from "./src/API/AmplifyApi";
import Signup from "./src/Pages/Singup";
Amplify.configure(awsconfig);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);

  const checkIfLoggedIn = async () => {
    const onSuccess = (user) => {
      setUser(user);
      setLoading(false);
    };
    const onFail = () => setLoading(false);
    await amplifyApi.checkIfLoggedIn(onSuccess, onFail);
  };

  const onAuthenticate = (user) => {
    setUser(user);
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  const defaultOptions = {
    title: "",
    headerTransparent: true,
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              onLogin={onAuthenticate}
              options={defaultOptions}
              component={Welcome}
            />
            <Stack.Screen
              name="Login"
              onLogin={onAuthenticate}
              options={defaultOptions}
              component={Login}
            />
            <Stack.Screen
              name="Signup"
              onSignUp={onAuthenticate}
              component={Signup}
              options={defaultOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
