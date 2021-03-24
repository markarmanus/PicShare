import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { AppButton } from "../components";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
import COLORS from "../config/Colors";
import { AppAlbum } from "../components";
import IMAGES from "../../images";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

function Gallery() {
  const { setUser, user } = useContext(UserContext);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const onLogout = () => {
    const afterLogout = () => {
      setUser(undefined);
    };
    amplifyApi.singOut(afterLogout);
  };

  const getUserAlbums = async () => {
    const albums = await new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
          },
        ]);
      }, 1000);
    });
    setAlbums(albums);
    setLoading(false);
  };
  useEffect(() => {
    console.log(setAlbums);
    getUserAlbums();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Gallery
        </Text>
      </View>

      <View style={styles.albumsContainer}>
        <TouchableOpacity style={styles.albumContainer}>
          <FontAwesome5 name="plus" size={35} color="white" />
        </TouchableOpacity>
        {albums.map((album) => {
          return (
            <TouchableOpacity style={styles.albumContainer}>
              <ImageBackground
                source={{ uri: album.thumbnail }}
                style={styles.albumThumbnail}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <BlurView
        intensity={loading ? 10 : 0}
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {loading ? (
          <View style={{ width: "10%", height: "10%", alignSelf: "center" }}>
            <ActivityIndicator color="white" />
          </View>
        ) : null}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.accent,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  albumThumbnail: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  navBar: {
    width: "100%",
    backgroundColor: COLORS.default.accent,
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },
  albumsContainer: {
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  albumContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.default.lightGray,
    margin: 10,
  },
});
export { Gallery };
