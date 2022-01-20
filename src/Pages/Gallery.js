import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import {
  AppButton,
  AppClickableIcon,
  ICON_COMPONENT_TYPES,
} from "../components";
import amplifyApi from "../API/AmplifyApi";
import UserContext from "../contexts/user";
import COLORS from "../config/Colors";
import { AppAlbum } from "../components";
import IMAGES from "../../images";
import { BlurView } from "expo-blur";
import picShareApi from "../API/PicShareApi";

const window = Dimensions.get("screen");
const gridMargin = 5;
const albumSquareSize = (window.width * 0.7) / 2 - 10;
class Gallery extends React.Component {
  static contextType = UserContext;

  state = {
    albums: [],
    loading: true,
    gridMode: "grid",
    width: albumSquareSize
  };

  onLogout = () => {
    const afterLogout = () => {
      setUser(undefined);
    };
    amplifyApi.singOut(afterLogout);
  };
  changeGridView = () => {
    if (this.state.gridMode === "grid") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        gridMode: 'wide',
        width: window.width * 0.9
      })
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        gridMode: 'grid',
        width: albumSquareSize
      })
    }
  };
  getUserAlbums = async () => {
    const albums = await new Promise((res, rej) => {
      setTimeout(() => {
        res([
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
            name: "dwadw",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
            name: "dwadw",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
            name: "dwadw",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
            name: "dwadw",
          },
          {
            thumbnail:
              "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001980/img/basic/a0001980_main.jpg?20200929151528&q=80&rw=750&rh=536",
            name: "dwadw",
          },
        ]);
      }, 1000);
    });
    this.setState({
      albums,
      loading: false,
    });
  };
  componentDidMount() {
    this.getUserAlbums();
  }
  render() {
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 30,
            marginBottom: 10,
            width: window.width * 0.7,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Albums
          </Text>
          <AppClickableIcon
            type={ICON_COMPONENT_TYPES.MaterialCommunityIcons}
            name="view-grid"
            onPress={this.changeGridView}
            size={24}
            color="white"
          />
        </View>
        <ScrollView contentContainerStyle={styles.albumsContainer}>
          <View
            style={[styles.albumContainer, { width: this.state.width }]}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("CreateAlbum")}
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                backgroundColor: COLORS.default.accent,
                width: "100%",
                height: "100%",
              }}
            >
              <AppClickableIcon
                type={ICON_COMPONENT_TYPES.FontAwesome5}
                name="plus"
                size={35}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {this.state.albums.map((album, index) => {
            return (
              <View
                key={index}
                style={[styles.albumContainer, { width: this.state.width }]}
              >
                <TouchableOpacity style={{ width: "100%", height: "100%" }}>
                  <ImageBackground
                    source={{ uri: album.thumbnail }}
                    style={styles.albumThumbnail}
                  />
                  <View style={styles.albumTextContainer}>
                    <Text style={styles.albumName}>{"United States "}</Text>
                    <Text style={styles.albumLocation}>{"United States "}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={{ uri: this.state.imageUrl }}
          />
          {/* <AppButton
            title="HI"
            onPress={() => {
              console.log(this.state.imageUrl);
              picShareApi.getUserAlbums((res) => {
                console.log(res.data);
                this.setState({
                  imageUrl: res.data[0],
                });
              });
            }}
          /> */}
        </ScrollView>

        {this.state.loading ? (
          <BlurView
            intensity={10}
            style={[
              StyleSheet.absoluteFill,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <View style={{ width: "10%", height: "10%", alignSelf: "center" }}>
              <ActivityIndicator color="white" />
            </View>
          </BlurView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.lightBlack,
    paddingTop: 20,
    alignItems: "center",
    width: window.width,
    justifyContent: "flex-start",
  },
  albumThumbnail: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.6,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  navBar: {
    width: "100%",
    backgroundColor: COLORS.default.lightBlack,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
  },
  albumsContainer: {
    width: window.width,
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  albumContainer: {
    height: albumSquareSize,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.default.lightGray,
    margin: 10,
  },
  albumName: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  albumLocation: {
    color: "white",
    fontSize: 11,
    fontWeight: "200",
  },
  albumTextContainer: {
    left: "7%",
    top: "40%",
    width: "60%",
    position: "absolute",
  },
});
export { Gallery };
