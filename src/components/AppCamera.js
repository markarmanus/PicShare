import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import COLORS from "../config/Colors";
import { Camera } from "expo-camera";
import {
  AppClickableIcon,
  ICON_COMPONENT_TYPES,
} from "../components/AppClickableIcon";
import MainContext from "../contexts/main";
import IMAGES from "../../images";
import { useFocusEffect } from "@react-navigation/native";

const EXPO_SUPPORTED_RATIOS = ["16:9", "4:3", "1:1"];
const window = Dimensions.get("window");
let done = false;
const AppCamera = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraMode, setCameraMode] = useState("picture");
  const [aspectRatio, setAspectRatio] = useState("4:3");
  const [aspectRatios, setAspectRatios] = useState([]);
  const [flash, setFlash] = useState("off");
  const [currentActiveInTopBar, setCurrentActiveInTopBar] = useState(undefined);
  const { mainContext, setMainContext } = useContext(MainContext);

  const camera = useRef(null);
  const topBarOpacity = useRef(new Animated.Value(1)).current;
  const topBarWidth = useRef(new Animated.Value(1)).current;
  const cameraBackgroundOpacity = useRef(new Animated.Value(0)).current;

  const checkCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (status !== "granted") {
      console.log("Request Premission");
    }
  };

  const initializeCamera = async (newRatio) => {
    if (camera.current) {
      const supportedRatios = await camera.current.getSupportedRatiosAsync();
      let aspectRatios = EXPO_SUPPORTED_RATIOS.filter((ratio) =>
        supportedRatios.includes(ratio)
      );
      setAspectRatios(aspectRatios);
      setAspectRatio(aspectRatios[0]);
    }
  };

  useFocusEffect(() => {
    checkCameraPermission();
    const unsub = navigation.addListener("selectedTabPress", (e) => {
      if (e.data.selectedTabIndex === 1) {
        onCameraClick(cameraMode);
      }
    });
    return () => {
      unsub();
    };
  });

  useEffect(() => {
    navigation.addListener("blur", (e) => {
      if (camera.current) {
        setTimeout(() => {
          camera.current.pausePreview();
        }, 300);
        if (mainContext.cameraMode !== "picture") {
          setMainContext({
            cameraIcon: IMAGES.LOGO,
            cameraMode: "picture",
            cameraIconSize: 40,
          });
          setCameraMode("picture");
        }
      }
    });

    navigation.addListener("focus", (e) => {
      if (camera.current) {
        camera.current.resumePreview();
      }
    });
  }, []);

  const updateRatio = (newRatio) => {
    startTopBarAnimation();
    setAspectRatio(newRatio);
    setCurrentActiveInTopBar(undefined);
  };
  const setFlashMode = (newMode) => {
    startTopBarAnimation();
    setFlash(newMode);
    setCurrentActiveInTopBar(undefined);
  };
  const toggleType = () => {
    if (type === Camera.Constants.Type.front) {
      setType(Camera.Constants.Type.back);
    } else {
      setType(Camera.Constants.Type.front);
    }
  };
  const onChangeCameraMode = () => {
    const newCameraMode = cameraMode === "picture" ? "video" : "picture";
    setMainContext({
      cameraMode: newCameraMode,
      cameraIconSize: 40,
      cameraIcon: cameraMode === "picture" ? IMAGES.VIDEO_RECORD : IMAGES.LOGO,
    });
    setCameraMode(newCameraMode);
  };
  const flashBackground = () => {
    Animated.sequence([
      Animated.timing(cameraBackgroundOpacity, {
        toValue: 1,
        duration: 20,
        useNativeDriver: true,
      }),
      Animated.timing(cameraBackgroundOpacity, {
        toValue: 0,
        duration: 20,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onCameraClick = () => {
    if (cameraMode === "picture") {
      flashBackground();
    } else if (cameraMode === "recording") {
      setMainContext({
        cameraIcon: IMAGES.VIDEO_RECORD,
        cameraMode: "video",
        cameraIconSize: 40,
      });
      setCameraMode("video");
    } else {
      setMainContext({
        cameraIcon: IMAGES.STOP,
        cameraMode: "recording",
        cameraIconSize: 30,
      });
      if (currentActiveInTopBar !== undefined)
        setCurrentActiveInTopBar(undefined);
      setCameraMode("recording");
    }
  };

  const startTopBarAnimation = () => {
    const fadeDuration = 250;
    const scaleDuration = 270;
    Animated.parallel([
      Animated.sequence([
        Animated.timing(topBarOpacity, {
          toValue: 0,
          duration: fadeDuration,
          useNativeDriver: true,
        }),
        Animated.timing(topBarOpacity, {
          toValue: 1,
          duration: fadeDuration,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(topBarWidth, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(topBarWidth, {
          toValue: 1,
          duration: scaleDuration,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const onClickIcon = (clickedIcon) => {
    if (clickedIcon !== currentActiveInTopBar) {
      startTopBarAnimation();
      setCurrentActiveInTopBar(clickedIcon);
    }
  };

  const getTopBarContent = () => {
    switch (currentActiveInTopBar) {
      case "ratio":
        return aspectRatios.map((ratio) => {
          return {
            ratio,
            color: ratio === aspectRatio ? COLORS.default.warning : "white",
            onPress: () => updateRatio(ratio),
          };
        });
      case "flash":
        const color = (type) =>
          type === flash ? COLORS.default.warning : "white";
        return [
          {
            type: ICON_COMPONENT_TYPES.MaterilaIcon,
            name: "flash-on",
            onPress: () => setFlashMode("on"),
            color: color("on"),
          },
          {
            type: ICON_COMPONENT_TYPES.MaterilaIcon,
            name: "flash-off",
            onPress: () => setFlashMode("off"),
            color: color("off"),
          },
          {
            type: ICON_COMPONENT_TYPES.MaterilaIcon,
            name: "flash-auto",
            onPress: () => setFlashMode("auto"),
            color: color("auto"),
          },
        ];
      default:
        const flashIcon =
          flash === "off"
            ? "flash-off"
            : flash === "auto"
            ? "flash-auto"
            : "flash-on";
        return [
          {
            type: ICON_COMPONENT_TYPES.MaterilaIcon,
            name: flashIcon,
            color: flashIcon === "flash-on" ? COLORS.default.warning : "white",
            disabled: cameraMode === "recording",
            onPress: () => onClickIcon("flash"),
          },
          {
            ratio: aspectRatio,
            onPress: () => onClickIcon("ratio"),
            disabled: cameraMode === "recording",
          },
        ];
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!done && camera.current) {
    camera.current.pausePreview();
    done = true;
  }
  const aspectRatioSplit = aspectRatio
    .split(":")
    .map((value) => parseInt(value));
  const heightRatio = aspectRatioSplit[0] / aspectRatioSplit[1];
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topIconsBar,
          {
            opacity: topBarOpacity,
            transform: [
              {
                scaleX: topBarWidth,
              },
            ],
          },
        ]}
      >
        {getTopBarContent().map((icon) => {
          if (icon.ratio) {
            const colorToUse = icon.color || "white";
            const ratioSplit = icon.ratio.split(":");
            return (
              <TouchableOpacity
                style={[
                  { borderColor: colorToUse, opacity: icon.disabled ? 0.6 : 1 },
                  styles.ratioIconContainer,
                ]}
                onPress={icon.onPress}
                disabled={icon.disabled}
                key={ratioSplit[0]}
              >
                <View style={styles.ratioIconInnerContainer}>
                  <Text style={{ color: colorToUse }}>{ratioSplit[0]}</Text>
                  <Text style={{ color: colorToUse }}>{` : `}</Text>
                  <Text style={{ color: colorToUse }}>{ratioSplit[1]}</Text>
                </View>
              </TouchableOpacity>
            );
          }
          return (
            <AppClickableIcon
              containerStyle={styles.iconContainer}
              iconStyle={styles.icon}
              key={Math.random()}
              tintColor={"white"}
              size={24}
              color={"white"}
              {...icon}
            />
          );
        })}
      </Animated.View>
      <View style={styles.flipCameraIconContainer}>
        <AppClickableIcon
          type={ICON_COMPONENT_TYPES.MaterilaIcon}
          name="flip-camera-android"
          color="white"
          onPress={toggleType}
          size={30}
        />
        <AppClickableIcon
          type={ICON_COMPONENT_TYPES.MaterilaIcon}
          disabled={cameraMode === "recording"}
          key={Math.random()}
          name={cameraMode === "picture" ? "videocam" : "camera-alt"}
          color="white"
          onPress={onChangeCameraMode}
          size={30}
        />
      </View>
      <Camera
        useCamera2Api={false}
        onCameraReady={initializeCamera}
        ratio={aspectRatio}
        ref={camera}
        style={[styles.camera, { height: window.width * heightRatio }]}
        zoom={0}
        flash={flash}
        type={type}
      >
        <TouchableOpacity
          style={styles.cameraBackground}
          onPress={() => onClickIcon()}
        >
          <Animated.View
            style={[
              styles.cameraBackground,
              {
                backgroundColor: "black",
                opacity: cameraBackgroundOpacity,
              },
            ]}
          ></Animated.View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 40,
    alignContent: "center",
    height: "100%",
    backgroundColor: "black",
  },
  camera: {
    width: window.width,
    position: "relative",
  },
  cameraBackground: {
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  iconContainer: {
    height: "75%",
    padding: 8,
  },
  icon: {
    width: 50,
    height: "100%",
  },
  topIconsBar: {
    backgroundColor: "black",
    height: 60,
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ratioIconContainer: {
    width: 0.07 * window.width,
    height: 0.07 * window.width,
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 10,
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  ratioIconInnerContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    textAlign: "center",
    justifyContent: "space-around",
    width: 0.07 * window.width + 1,
  },
  flipCameraIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 300,
    top: 120,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 7,
    right: 20,
  },
});
export { AppCamera };
