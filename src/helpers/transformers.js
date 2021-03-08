const transformUser = (user) => {
  return {
    email: user.attributes.email,
    emailVerified: user.attributes.email_verified,
    userId: user.attributes.sub,
    fullName: user.attributes["custom:FullName"],
  };
};
const transformers = { transformUser };
export default transformers;
