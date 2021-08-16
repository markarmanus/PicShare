import { Platform } from "react-native";

const mockToast = () => {
  return {
    show: (msg) => { alert(msg) },
  };
};

let Toast = mockToast();
if (Platform.OS !== "web" && Platform.OS !== "ios") {
  Toast = require("react-native-simple-toast").default;
}
export { Toast };
