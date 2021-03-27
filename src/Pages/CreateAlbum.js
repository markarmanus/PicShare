import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from "react-native";
import COLORS from "../config/Colors";
import {
  AppTextInput,
  AppClickableIcon,
  ICON_COMPONENT_TYPES,
  AppTextInputWithIcon,
} from "../components";

const window = Dimensions.get("screen");

class CreateAlbum extends React.Component {
  state = {
    name: "",
    location: "",
    sharedWith: {},
    timeStamps: {},
    containerHeight: new Animated.Value(window.height * 0.2),
    errors: {},
  };

  validateInputs(input) {
    switch (input) {
      case "name":
        if (this.state.name === "")
          this.setState({
            errors: {
              ...this.state.errors,
              name: "Please Input a Valid Name!",
            },
          });
        break;
    }
  }
  componentDidMount() {
    Animated.timing(this.state.containerHeight, {
      toValue: window.height * 0.8,
      duration: 1000,
      easing: Easing.in(Easing.elastic(1.1)),
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.inputsContainer,
            { height: this.state.containerHeight },
          ]}
        >
          <AppTextInputWithIcon
            onChangeText={(name) => this.setState({ name })}
            placeholder="Album Name"
            // containerStyle={styles.textInputContainer}
            onBlur={() => this.validateInputs("name")}
            placeholderTextColor="white"
            // textInputStyle={styles.textInputStyle}
            error={this.state.errors.name}
          />
          <AppTextInput
            onChangeText={(name) => this.setState({ name })}
            placeholder="Album Location"
            placeholderTextColor="white"
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.textInputStyle}
            error={this.state.errors.name}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 11,
              height: 40,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "white" }}>Add Your Friends </Text>
            <AppClickableIcon
              name="info"
              size={24}
              color="white"
              type={ICON_COMPONENT_TYPES.MaterilaIcon}
            />
          </View>
          <View style={styles.usersContainer}>
            <AppTextInput
              onChangeText={(name) => this.setState({ name })}
              placeholder={"Search"}
              icon={{
                name: "search",
                size: 20,
                color: "black",
                type: ICON_COMPONENT_TYPES.FontAwesome5,
              }}
              placeholderTextColor="black"
              containerStyle={[
                styles.textInputContainer,
                { backgroundColor: "white" },
              ]}
              textInputStyle={styles.textInputStyle}
              error={this.state.errors.name}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.default.lightBlack,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: window.height * 0.15,
  },
  inputsContainer: {
    width: window.width * 0.9,
    height: window.height * 0.75,
    overflow: "hidden",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  textInputContainer: {
    backgroundColor: "#3A3B3C",
    borderRadius: 10,
    height: 40,
    paddingLeft: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textInputStyle: {
    borderRadius: 10,
    color: "white",
    height: 40,
  },
  usersContainer: {
    width: "100%",
    flex: 0.95,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#3A3B3C",
  },
});
export { CreateAlbum };
