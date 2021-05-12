import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
const ICON_COMPONENT_TYPES = {
  MaterilaIcon: "materialIcon",
  Image: "image",
  Ionicons: "ionicons",
  MaterialCommunityIcons: "materialCommunityIcons",
  FontAwesome5: "fontAwesome5",
  FontAwesome: "fontAwesome",
  Entypo: "entypo",
};

const AppClickableIcon = ({
  iconStyle,
  containerStyle,
  disabled,
  onPress,
  disabledStyle = true,
  type,
  containerKey,
  ...props
}) => {
  const getProperComponent = () => {
    switch (type) {
      case ICON_COMPONENT_TYPES.Ionicons:
        return <Ionicons {...props} />;

      case ICON_COMPONENT_TYPES.MaterilaIcon:
        return <MaterialIcons {...props} />;
      case ICON_COMPONENT_TYPES.MaterialCommunityIcons:
        return <MaterialCommunityIcons {...props} />;
      case ICON_COMPONENT_TYPES.FontAwesome5:
        return <FontAwesome5 {...props} />;
      case ICON_COMPONENT_TYPES.FontAwesome:
        return <FontAwesome {...props} />;
      case ICON_COMPONENT_TYPES.Entypo:
        return <Entypo {...props} />;
      case ICON_COMPONENT_TYPES.Image:
      default:
        return (
          <Image
            resizeMode="center"
            resizeMethod="resize"
            style={iconStyle}
            {...props}
          />
        );
    }
  };
  const finalContainerStyle = [
    styles.container,
    { opacity: onPress && disabled ? 0.6 : 1 },
    containerStyle,
  ];
  return onPress !== undefined ? (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      key={containerKey}
      style={finalContainerStyle}
    >
      {getProperComponent()}
    </TouchableOpacity>
  ) : (
    <View style={finalContainerStyle} key={containerKey}>
      {getProperComponent()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 30,
    marginVertical: 15,
  },
});

export { AppClickableIcon, ICON_COMPONENT_TYPES };
