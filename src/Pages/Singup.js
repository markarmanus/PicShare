import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const signup = async () => {
    await Auth.signIn(email, password).then((res) => {
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

      <Button title={"Signup"} onPress={signup} />
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
