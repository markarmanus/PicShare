import React, { useState, useEffect } from "react";
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
import ValidateEmail from "./src/Pages/ValidateEmail";
import UserContext from "./src/contexts/user";
import transformers from "./src/helpers/transformers";
Amplify.configure(awsconfig);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const checkIfLoggedIn = async () => {
    const onSuccess = (user) => {
      setUserAuthenticated(true);
      setUser(transformers.transformUser(user));
      setLoading(false);
    };
    const onFail = () => {
      setUserAuthenticated(false);
      setLoading(false);
    };
    await amplifyApi.checkIfLoggedIn(onSuccess, onFail);
  };

  useEffect(() => {
    if (!userAuthenticated || user === undefined) checkIfLoggedIn();
  }, [loading, user]);

  if (loading) {
    return <Loading />;
  }
  const defaultOptions = {
    title: "",
    headerTransparent: true,
  };
  const userContextValue = {
    user,
    setUser,
  };
  const Stack = createStackNavigator();

  return (
    <UserContext.Provider value={userContextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          {userAuthenticated ? (
            <Stack.Screen
              name="Home"
              options={defaultOptions}
              component={Home}
            />
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={defaultOptions}
              />
              <Stack.Screen
                name="Login"
                options={defaultOptions}
                component={Login}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={defaultOptions}
              />
              <Stack.Screen
                name="ValidateEmail"
                component={ValidateEmail}
                options={defaultOptions}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
