import { Auth } from "aws-amplify";

import picShareApi from "./PicShareApi";
const checkIfLoggedIn = async (onSuccess, onFail) => {
  Auth.currentAuthenticatedUser()
    .then((user) => {
      picShareApi.verifyUser(user, onSuccess, onFail);
    })
    .catch((e) => {
      onFail(e);
    });
};

const signIn = async (email, password, onSuccess, onFail) => {
  Auth.signIn(email, password)
    .then((user) => {
      picShareApi.verifyUser(user, onSuccess, onFail);
    })
    .catch((e) => {
      onFail(e);
    });
};

const singUp = async (email, password, onSuccess, onFail) => {
  Auth.signUp(email, password).then(onSuccess).catch(onFail);
};

const amplifyApi = { checkIfLoggedIn, signIn, singUp };
export default amplifyApi;
