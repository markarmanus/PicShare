import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
import MainContext from "../contexts/main";
import COLORS from "../config/Colors";
import { Camera, Profile, Gallery } from "./";
import { AppNavBar } from "../components";
import IMAGES from "../../images";

const window = Dimensions.get("screen");

class CreateAlbum extends React.Component {
  state = {};

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.lightBlack,
    alignItems: "center",
    justifyContent: "center",
  },
});
export { CreateAlbum };
