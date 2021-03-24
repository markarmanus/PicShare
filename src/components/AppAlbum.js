import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
} from "react-native";
import COLORS from "../config/Colors";
import IMAGES from "../../images";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppAlbum = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <ImageBackground style={styles.thumbnail} source={props.thumbnail} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  thumbnail: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
export { AppAlbum };
