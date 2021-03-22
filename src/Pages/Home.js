import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
import MainContext from "../contexts/main";
import COLORS from "../config/Colors";
import { Camera, Profile, Gallery } from "./";
import { AppNavBar } from "../components";
import IMAGES from "../../images";

const window = Dimensions.get("screen");

class Home extends React.Component {
  static contextType = UserContext;
  state = {
    mainContext: {
      cameraIcon: IMAGES.LOGO,
      cameraIconSize: 40,
    },
  };
  onLogout = () => {
    const { setUser } = this.context;
    const afterLogout = () => {
      setUser(undefined);
    };
    amplifyApi.singOut(afterLogout);
  };
  setMainContext = (mainContext, callback) => {
    this.setState({ mainContext }, callback);
  };
  render() {
    const Tab = createMaterialTopTabNavigator();
    const mainContextValue = {
      mainContext: this.state.mainContext,
      setMainContext: this.setMainContext,
    };
    return (
      <MainContext.Provider value={mainContextValue}>
        <Tab.Navigator
          tabBarPosition="bottom"
          initialRouteName="Camera"
          lazy={true}
          sceneContainerStyle={{
            width: window.width,
            height: window.height,
          }}
          tabBar={(props) => <AppNavBar {...props} />}
        >
          <Tab.Screen
            name="Gallery"
            component={Gallery}
            initialParams={{ arrayItem: "Hello" }}
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
              image: this.state.mainContext.cameraIcon,
              imageSize: this.state.mainContext.cameraIconSize,
              imageColor: "black",
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
      </MainContext.Provider>
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
