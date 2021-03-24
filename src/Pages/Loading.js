import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  Animated,
  Button,
} from "react-native";
import IMAGES from "../../images";
import COLORS from "../config/Colors";

const window = Dimensions.get("screen");

class Loading extends React.Component {
  state = {
    imageTransform: [],
    animationStarted: false,
    containerOpacity: new Animated.Value(0),
  };
  startPictureAnimation = () => {
    const scaleY = new Animated.Value(1);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleY, {
          toValue: 0.3,
          duration: 200,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(this.state.containerOpacity, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
          delay: 400,
        }),
        Animated.timing(this.state.containerOpacity, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        this.props.onAnimationFinish();
      }, 500);
    });
    this.setState({
      imageTransform: [{ scaleY }],
    });
  };
  componentDidUpdate() {
    if (!this.state.animationStarted && this.props.startAnimation) {
      this.setState({
        animationStarted: true,
      });
      this.startPictureAnimation();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              backgroundColor: COLORS.default.lightBlack,
              width: window.width,
              height: window.height,
              flex: 1,
              top: 0,
              position: "absolute",
            },
            { opacity: this.state.containerOpacity },
          ]}
        ></Animated.View>
        <Animated.Image
          resizeMode="center"
          style={[styles.logo, { transform: this.state.imageTransform }]}
          source={IMAGES.LOGO}
        />
        <View style={styles.loadingIndicator}>
          <ActivityIndicator
            style={{ width: "100%", height: "100%", flex: 1 }}
            size="large"
            color={COLORS.default.mainColor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.background,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    paddingTop: 150,
  },
  logo: {
    width: 300,
    height: 300,
  },
  loadingIndicator: {
    width: "30%",
    height: "30%",
    alignSelf: "center",
  },
});
export { Loading };
