import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  logged: false,
  username: null,
  jwt_token: null,
};

const AuthentificationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.LOGIN: {
      let newState = _.cloneDeep(state);
      newState.logged = true;
      return newState;
    }

    case ACTIONS.Types.LOGOUT: {
      let newState = _.cloneDeep(state);
      newState.logged = false;
      newState.username = null;
      localStorage.setItem("accessToken", null);
      localStorage.setItem("refreshToken", null);
      return newState;
    }

    default:
      return state;
  }
};

export default AuthentificationReducer;
