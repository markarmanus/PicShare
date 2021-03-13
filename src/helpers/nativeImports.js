import { Platform } from "react-native";

const mockToast = () => {
  return {
    show: () => {},
  };
};

let Toast = mockToast();
if (Platform.OS !== "web") {
  Toast = require("react-native-simple-toast").default;
}
export { Toast };
