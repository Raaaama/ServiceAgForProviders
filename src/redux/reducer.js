const initialState = {
  ip: " https://c075-2-135-26-114.eu.ngrok.io",
  uid: "",
  showLogIn: true,
  showReg: false,
  showEnrollments: false
};

const reducer = (state = initialState, action) => {
  if ((action.type == "CHANGEUID")) {
    return {
      ...state,
      uid: action.payload,
    };
  } 
  else if ((action.type == "SHOWREGCOMPONENT")) {
    return {
      ...state,
      showReg: action.payload,
    };
  }
  else if ((action.type == "SHOWLOGINCOMPONENT")) {
    return {
      ...state,
      showLogIn: action.payload,
    }
  }
  else if ((action.type == "SHOWENROLLMENTSCOMPONENT")) {
    return {
      ...state,
      showEnrollments: action.payload,
    }
  }
  else {
    return state;
  }
};

export default reducer;
