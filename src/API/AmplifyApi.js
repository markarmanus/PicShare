import { Auth } from "aws-amplify";
import picShareApi from "./PicShareApi";

const checkIfLoggedIn = async (onSuccess, onFail) => {
  await Auth.currentAuthenticatedUser()
    .then((user) => {
      picShareApi.verifyUser(user, onSuccess, onFail);
    })
    .catch((e) => {
      onFail(e);
    });
};

const signIn = async (email, password, onSuccess, onFail) => {
  await Auth.signIn(email, password)
    .then((user) => {
      picShareApi.verifyUser(user, onSuccess, onFail);
    })
    .catch((e) => {
      onFail(e);
    });
};

const getIdJwtToken = async () => {
  const session = await Auth.currentSession();
  return session.getIdToken().getJwtToken();
};

const resendConfirmationCode = async (email, onSuccess, onFail) => {
  await Auth.resendSignUp(email).then(onSuccess).catch(onFail);
};
const singUp = async (email, password, attributes = {}, onSuccess, onFail) => {
  Auth.signUp({ username: email, password, attributes })
    .then(onSuccess)
    .catch(onFail);
};

const validateEmail = async (email, code, onSuccess, onFail) => {
  await Auth.confirmSignUp(email, code).then(onSuccess).catch(onFail);
};

const singOut = async (onSuccess, onFail) => {
  await Auth.signOut().then(onSuccess).catch(onFail);
};

const amplifyApi = {
  checkIfLoggedIn,
  signIn,
  singUp,
  validateEmail,
  resendConfirmationCode,
  singOut,
  getIdJwtToken,
};
export default amplifyApi;
