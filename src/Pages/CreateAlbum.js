import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import COLORS from "../config/Colors";
import {
  AppTextInput,
  AppClickableIcon,
  ICON_COMPONENT_TYPES,
  AppButton,
} from "../components";
import picShareApi from "../API/PicShareApi";
import { USER_ROLES } from "../constants/";

const window = Dimensions.get("screen");
const ERRORS = {
  name: "Please Insert the Album Name",
  location: "Location Cant be Empty",
};
const uploadIcon = {
  type: ICON_COMPONENT_TYPES.Entypo,
  name: "camera",
};
const viewerIcon = {
  type: ICON_COMPONENT_TYPES.MaterialCommunityIcons,
  name: "camera-burst",
};

class CreateAlbum extends React.Component {
  state = {
    name: "",
    location: "",
    sharedWith: {},
    timeStamps: {},
    search: null,
    searchResults: [],
    selectedUsers: {},
    containerHeight: window.height * 0.2,

    errors: {},
  };

  validateInputs(input) {
    if (this.state[input] === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          [input]: ERRORS[input],
        },
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          [input]: undefined,
        },
      });
    }
  }

  updateInputs(input, value) {
    this.setState(
      {
        [input]: value,
      },
      () => {
        this.validateInputs(input);
        if (input === "search") this.updateSearchResults();
      }
    );
  }
  updateSearchResults(newSearchValue) {
    this.setState({
      search: newSearchValue,
    });
    if (newSearchValue !== "") {
      picShareApi.searchUsers(newSearchValue, (res) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // for delayed effect, request could return after initial check
        if (this.state.search !== "")
          this.setState({ searchResults: res.data });
      });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        searchResults: [],
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const spring = {...LayoutAnimation.Presets.spring}
      spring.duration = 1500
      LayoutAnimation.configureNext(spring);
      this.setState({
      containerHeight: window.height * 0.88
      })
    }, 100)
  }

  changeUserRole(user, role) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState(
      {
        selectedUsers: {
          ...this.state.selectedUsers,
          [user.id]: { ...this.state.selectedUsers[user.id], role, ...user },
        },
      },
      () => console.log(this.state.selectedUsers)
    );
  }

  removeUserFromSelected(user) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const copy = { ...this.state.selectedUsers };
    delete copy[user.id];
    this.setState({
      selectedUsers: copy,
    });
  }

  toggleExpandUserBox(userId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      currentlyExpandedBoxId:
        this.state.currentlyExpandedBoxId === userId ? undefined : userId,
    });
  }

  createAlbum() {
    this.validateInputs("name");
    this.validateInputs("location");
    if (this.state.name !== "" && this.state.location !== "") {
      picShareApi.createAlbum(
        {
          name: this.state.name,
          location: this.state.location,
          permissions: this.state.selectedUsers,
        },
        (res) => {
          console.log(res);
          this.props.navigation.pop();
        },
        (error) => {
          if (error.response.status === 409) {
            this.setState({
              errors: { ...this.state.errors, name: "Name Is Already Used!" },
            });
          }
        }
      );
    }
  }

  renderSearchResults() {
    const toRender = this.state.searchResults.filter((user) => {
      const selectedUsersArray = Object.values(this.state.selectedUsers);
      for (let i = 0; i < selectedUsersArray.length; i++) {
        const selectedUser = selectedUsersArray[i];
        if (selectedUser.email === user.email) {
          return false;
        }
      }
      return true;
    });

    return toRender.map((user) => {
      return (
        <View key={user.id} style={styles.searchResultBox}>
          <AppClickableIcon
            type={ICON_COMPONENT_TYPES.FontAwesome}
            name="user-circle"
            containerStyle={{ width: "auto" }}
            size={24}
            color="black"
          />
          <View style={styles.searchBoxInnerContainer}>
            <Text style={styles.boldedText}>{user.fullName}</Text>
            <Text style={styles.normalText}>{user.email}</Text>
          </View>
          <View style={[styles.centerFlexBox]}>
            <AppClickableIcon
              onPress={() => this.changeUserRole(user, USER_ROLES.UPLOADER)}
              type={ICON_COMPONENT_TYPES.Entypo}
              name="camera"
              size={16}
              color="black"
            />
            <View style={styles.dividerLine} />
            <AppClickableIcon
              type={ICON_COMPONENT_TYPES.MaterialCommunityIcons}
              onPress={() => this.changeUserRole(user, USER_ROLES.VIEWER)}
              name="camera-burst"
              size={16}
              color="black"
            />
          </View>
        </View>
      );
    });
  }

  renderSelectedUsers() {
    return Object.values(this.state.selectedUsers).map((user, index) => {
      const isCurrentlyExpanded = this.state.currentlyExpandedBoxId === user.id;
      const isUploader = user.role === USER_ROLES.UPLOADER;
      const firstIcon = isUploader ? uploadIcon : viewerIcon;
      const secondIcon = isUploader ? viewerIcon : uploadIcon;
      return (
        <TouchableOpacity
          onPress={() => this.toggleExpandUserBox(user.id)}
          key={user.id}
          style={[
            styles.addedUserBox,
            {
              width: isCurrentlyExpanded ? "100%" : "28%",
              justifyContent: isCurrentlyExpanded ? "space-between" : "center",
            },
          ]}
        >
          <View
            style={[
              styles.centerFlexBox,
              {
                width: isCurrentlyExpanded ? "auto" : "100%",
              },
            ]}
          >
            <AppClickableIcon
              style={{ marginRight: 5 }}
              containerStyle={{ width: "auto" }}
              size={16}
              color="black"
              {...firstIcon}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
              }}
              numberOfLines={1}
            >
              {user.fullName}
            </Text>
          </View>

          {isCurrentlyExpanded ? (
            <View style={styles.centerFlexBox}>
              <AppClickableIcon
                onPress={() =>
                  this.changeUserRole(
                    user,
                    isUploader ? USER_ROLES.VIEWER : USER_ROLES.UPLOADER
                  )
                }
                onTouchEnd={(e) => e.stopPropagation()}
                size={16}
                color="black"
                {...secondIcon}
              />
              <View style={styles.dividerLine} />
              <AppClickableIcon
                type={ICON_COMPONENT_TYPES.Ionicons}
                onPress={() => this.removeUserFromSelected(user)}
                name="remove-circle"
                size={16}
                size={16}
                color="black"
              />
            </View>
          ) : null}
        </TouchableOpacity>
      );
    });
  }
  render() {
    const placeHolderColor = "rgba(255,255,255,0.7)";
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.inputsContainer,
            { height: this.state.containerHeight },
          ]}
        >
          <AppTextInput
            placeholder="Album Name"
            onChangeText={(e) => this.updateInputs("name", e)}
            // onChangeText={(value) => this.setState({ name: value })}
            placeholderTextColor={placeHolderColor}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.textInputStyle}
            error={this.state.errors.name}
          />
          <AppTextInput
            placeholder="Album Location"
            placeholderTextColor={placeHolderColor}
            containerStyle={styles.textInputContainer}
            // onChangeText={(value) => this.setState({ location: value })}
            onChangeText={(e) => this.updateInputs("location", e)}
            textInputStyle={styles.textInputStyle}
            error={this.state.errors.location}
          />
          <View style={styles.addFriendsTitle}>
            <Text style={{ color: "white" }}>Add Your Friends </Text>
            <AppClickableIcon
              name="info"
              size={24}
              color="white"
              type={ICON_COMPONENT_TYPES.MaterilaIcon}
            />
          </View>
          {Object.values(this.state.selectedUsers).length ? (
            <View style={styles.addedUsersContainer}>
              {this.renderSelectedUsers()}
            </View>
          ) : null}
          <View style={styles.usersContainer}>
            <AppTextInput
              onChangeText={(value) => this.updateSearchResults(value)}
              placeholder={"Search"}
              icon={{
                name: "search",
                size: 18,
                color: "black",
                type: ICON_COMPONENT_TYPES.FontAwesome5,
              }}
              placeholderTextColor="rgba(0,0,0,0.8)"
              containerStyle={[
                styles.textInputContainer,
                { backgroundColor: "white" },
              ]}
              textInputStyle={[styles.textInputStyle, { color: "black" }]}
            />
            <ScrollView contentContainerStyle={styles.searchResultsContainer}>
              {this.renderSearchResults()}
            </ScrollView>
            <AppButton
              title="Create"
              onPress={() => this.createAlbum()}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </View>
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
    paddingTop: window.height * 0.1,
  },
  inputsContainer: {
    width: window.width * 0.9,
    overflow: "hidden",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  textInputContainer: {
    backgroundColor: "#3A3B3C",
    borderRadius: 10,
    height: 40,
    paddingLeft: 10,
  },
  textInputStyle: {
    color: "white",
    height: 40,
  },
  searchResultsContainer: {
    overflow: "hidden",
    // flex: 0.85,
  },
  searchResultBox: {
    borderRadius: 40,
    width: "100%",
    height: 40,
    backgroundColor: "#B0B3B8",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    alignContent: "center",
    alignItems: "center",
  },
  addedUsersContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 8,
    padding: 10,
    flexWrap: "wrap",
    justifyContent: "center",
    maxHeight: 150,
    overflow: "hidden",
    backgroundColor: "red",
    borderRadius: 10,
    backgroundColor: "#3A3B3C",
  },
  addedUserBox: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    height: 30,
    backgroundColor: "#B0B3B8",
    overflow: "hidden",
    flexWrap: "nowrap",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 40,
  },
  centerFlexBox: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBoxInnerContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "flex-start",
    paddingTop: 8,
    position: "relative",
    height: "100%",
  },
  boldedText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 15,
  },
  normalText: {
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 11,
  },
  dividerLine: {
    width: 1,
    backgroundColor: "black",
    height: 25,
    marginHorizontal: 10,
  },
  addFriendsTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 11,
    height: 40,
    alignItems: "center",
    width: "100%",
  },
  usersContainer: {
    width: "100%",
    flex: 0.95,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#3A3B3C",
  },
  buttonContainer: {
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: "#B0B3B8",
  },
});
export { CreateAlbum };
