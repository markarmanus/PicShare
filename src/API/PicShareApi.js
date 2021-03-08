import axios from "axios";
import { API_CONFIG } from "../config/API";

const verifyUser = async (user, onSuccess, onFail) => {
  try {
    const data = JSON.stringify({
      token: user.signInUserSession.idToken.jwtToken,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${API_CONFIG.URL}/user/verify`, data, { headers })
      .then((res) => {
        onSuccess(user);
      });
  } catch (e) {
    onFail(e);
  }
};
const picShareApi = { verifyUser };
export default picShareApi;
