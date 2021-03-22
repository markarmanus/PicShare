import React, { useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";
import COLORS from "../config/Colors";

const windowWidth = Dimensions.get("window").width;

function AppNavBar({ state, descriptors, navigation, position }) {
  const currentTabOptions = descriptors[state.routes[state.index].key].options;
  const backgroundColor = currentTabOptions.backgroundColor || "transparent";
  const selectedImageOpacity = Animated.interpolate(position, {
    inputRange: [0, 0.1, 0.9, 1, 1.1, 1.9, 2, 2.1, 2.9, 3],
    outputRange: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  });
  const circleContainerTransform = Animated.interpolate(position, {
    inputRange: [0, 1, 2],
    outputRange: [windowWidth * -0.8 * 0.33, 0, windowWidth * 0.8 * 0.33],
  });
  const containerTransform = [{ translateX: circleContainerTransform }];
  const imageSize = (currentTabOptions.imageSize || 30) * 1.3;
  const imageTransform = [
    {
      translateX: new Animated.Value(-imageSize / 2),
    },
    { translateY: new Animated.Value(-imageSize / 2) },
  ];

  const circleSize = 76;
  const circleGap = 7;
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const selectedTabPressed = () => {
    navigation.emit({
      type: "selectedTabPress",
      canPreventDefault: true,
      data: {
        selectedTabIndex: state.index,
      },
    });
  };

  return (
    <View style={styles.navBarContainer}>
      <AnimatedTouchable
        onPress={selectedTabPressed}
        style={[styles.circleContainer, { transform: containerTransform }]}
      >
        <Animated.Image
          resizeMode="center"
          tintColor={currentTabOptions.imageColor || COLORS.default.mainColor}
          style={[
            styles.selectedImage,
            { transform: imageTransform, opacity: selectedImageOpacity },
            ,
            {
              width: imageSize,
              height: imageSize,
            },
          ]}
          source={currentTabOptions.image}
        />

        <Svg height={circleSize} width={circleSize}>
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2}
            fill={backgroundColor}
          />
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2 - circleGap}
            fill={"white"}
          />
        </Svg>
      </AnimatedTouchable>

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
            data: {
              wasFocused: isFocused,
            },
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.jumpTo(route.name, {
              currentScreen: route.name,
              startAnimation,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 0 : 1)),
        });

        const content = (
          <Animated.Image
            resizeMode="center"
            style={[
              styles.notSelectedIcon,
              { opacity },
              {
                width: options.imageSize || 30,
                height: options.imageSize || 30,
              },
            ]}
            source={options.image}
          />
        );
        return (
          <View key={index} style={styles.iconContainer}>
            <TouchableOpacity
              onPress={onPress}
              disabled={isFocused}
              onLongPress={onLongPress}
              style={styles.clickableIcon}
            >
              {content}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "white",
    position: "absolute",
    bottom: "10%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    position: "relative",
    height: 50, //  if you change this change the container height
    borderRadius: 25,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  circleContainer: {
    position: "absolute",
    zIndex: 1,
    top: -30,
  },
  selectedImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
    alignSelf: "center",
  },
  notSelectedIcon: {
    width: 35,
    height: 35,
    zIndex: 100,
    alignSelf: "center",
  },
  iconContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  clickableIcon: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",

    width: "70%",
    textAlign: "center",
  },
});
export { AppNavBar };
