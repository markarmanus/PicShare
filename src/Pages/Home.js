import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
import COLORS from "../config/Colors";
import { Camera, Profile, Gallery } from "./";
import { AppNavBar } from "../components";
import IMAGES from "../../images";

const window = Dimensions.get("screen");

class Home extends React.Component {
  static contextType = UserContext;
  onLogout = () => {
    const { setUser } = this.context;
    const afterLogout = () => {
      setUser(undefined);
    };
    amplifyApi.singOut(afterLogout);
  };

  render() {
    const Tab = createMaterialTopTabNavigator();

    return (
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="Camera"
        sceneContainerStyle={{
          flex: 1,
          width: window.width,
          height: window.height,
        }}
        tabBar={(props) => <AppNavBar {...props} />}
      >
        <Tab.Screen
          name="Gallery"
          component={Gallery}
          options={{
            image: IMAGES.GALLERY,
            imageColor: COLORS.default.mainColor,
            backgroundColor: COLORS.default.secondaryColor,
          }}
        />
        <Tab.Screen
          name="Camera"
          component={Camera}
          options={{
            image: IMAGES.LOGO,
            imageSize: 40,
            imageColor: COLORS.default.mainColor,
            backgroundColor: COLORS.default.background,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            image: IMAGES.USER,
            imageSize: 30,
            imageColor: COLORS.default.mainColor,
            backgroundColor: "#5497A7",
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
export { Home };
