import React from "react";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ICON_COMPONENT_TYPES = {
  MaterilaIcon: "materialIcon",
  Image: "image",
  Ionicons: "ionicons",
};

const AppClickableIcon = ({
  iconStyle,
  containerStyle,
  disabled,
  onPress,
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
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      key={containerKey}
      style={[
        styles.container,
        { opacity: disabled ? 0.6 : 1 },
        containerStyle,
      ]}
    >
      {getProperComponent()}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    height: 30,
    marginVertical: 15,
  },
});

export { AppClickableIcon, ICON_COMPONENT_TYPES };
