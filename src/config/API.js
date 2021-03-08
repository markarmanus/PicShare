import { Platform } from "react-native";

const API_CONFIG = {
  URL: Platform.select({
    android: "http://192.168.2.109:5000",
    default: "http://localhost:5000",
  }),
};
export { API_CONFIG };
