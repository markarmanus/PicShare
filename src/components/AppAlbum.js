import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppAlbum = ({onPress,thumbnail}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <ImageBackground style={styles.thumbnail} source={thumbnail} />
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
