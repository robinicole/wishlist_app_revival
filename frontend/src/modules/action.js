const Types = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};
// actions
const Login = (username, jwt_token) => ({
  type: Types.LOGIN,
  payload: { username: username, jwt_token: jwt_token },
});

const Logout = () => ({
  type: Types.LOGOUT,
  payload: {},
});

export default {
  Login,
  Logout,
  Types,
};
