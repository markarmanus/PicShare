import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Auth } from "aws-amplify";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const login = async () => {
    await Auth.signUp(email, password).then((res) => {
      console.log(res);
    });
  };
  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setPassword}
      />

      <Button title={"Login"} onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
