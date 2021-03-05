import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ user }) {
  console.log(user);
  return (
    <View>
      <Text>Loading</Text>
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
