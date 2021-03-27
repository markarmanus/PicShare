import axios from "axios";
import { API_CONFIG } from "../config/API";
import amplifyApi from "./AmplifyApi";
const jsonType = {};

const getDefaultHeaders = async () => {
  return {
    "Content-Type": "application/json",
    Authentication: await amplifyApi.getIdJwtToken(),
  };
};
const verifyUser = async (user, onSuccess, onFail) => {
  try {
    const headers = await getDefaultHeaders();

    await axios
      .post(`${API_CONFIG.URL}/user/verify`, {}, { headers })
      .then(() => {
        if (onSuccess) onSuccess(user);
      });
  } catch (e) {
    console.log(e);
    if (onFail) onFail(e);
  }
};

const searchUsers = async (searchQuery, onSuccess, onFail) => {
  try {
    await axios
      .get(`${API_CONFIG.URL}/user/search/${searchQuery}`, {
        headers: jsonType,
      })
      .then((res) => {
        if (onSuccess) onSuccess(res);
      });
  } catch (e) {
    console.log(e);
    if (onFail) onFail(e);
  }
};

const uploadPicture = async (album, picture, onSuccess, onFail) => {
  try {
    const data = new FormData();
    data.append("photo", {
      name: ".jpg",
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? picture.uri
          : picture.uri.replace("file://", ""),
    });
    await axios
      .post(`${API_CONFIG.URL}/album/${album}/uploadPicture`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authentication: await amplifyApi.getIdJwtToken(),
        },
      })
      .then((res) => {
        if (onSuccess) onSuccess(res);
      });
  } catch (e) {
    console.log(e);
    if (onFail) onFail(e);
  }
};

const getAlbum = async (album, onSuccess, onFail) => {
  try {
    const headers = await getDefaultHeaders();
    await axios
      .get(`${API_CONFIG.URL}/album/${album}`, { headers })
      .then((res) => {
        if (onSuccess) onSuccess(res);
      });
  } catch (e) {
    console.log(e);
    if (onFail) onFail(e);
  }
};

const createAlbum = async (albumData, onSuccess, onFail) => {
  try {
    const data = JSON.stringify({
      albumData,
    });
    const headers = await getDefaultHeaders();
    await axios
      .post(`${API_CONFIG.URL}/album`, data, { headers })
      .then((res) => {
        if (onSuccess) onSuccess(res);
      });
  } catch (e) {
    console.log(e);
    if (onFail) onFail(e);
  }
};
const picShareApi = {
  verifyUser,
  searchUsers,
  createAlbum,
  uploadPicture,
  getAlbum,
};
export default picShareApi;
