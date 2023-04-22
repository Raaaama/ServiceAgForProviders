const initialState = {
  ip: "https://ed1b-2-135-26-114.ngrok-free.app",
  uid: "",
  showLogIn: true,
  showReg: false,
  showEnrollments: false,
  showModal: false,
  showServiceModal: false,
  images: [],
  config: {
    headers: {
      "Access-Control-Allow-Origin": "https://ed1b-2-135-26-114.ngrok-free.app",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  },
  info: {},
  myServices: [],
  currentService: {},
  options: []
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
  else if ((action.type == "SETSHOWMODAL")) {
    return {
      ...state,
      showModal: action.payload,
    }
  }
  else if ((action.type == "SETIMAGES")) {
    return {
      ...state,
      images: action.payload,
    }
  }
  else if ((action.type == "SETINFO")) {
    return {
      ...state,
      info: action.payload,
    }
  }
  else if ((action.type == "SETMYSERVICES")) {
    return {
      ...state,
      myServices: action.payload,
    }
  }
  else if ((action.type == "SETSHOWSERVICEMODAL")) {
    return {
      ...state,
      showServiceModal: action.payload,
    }
  }
  else if ((action.type == "SETCURRENTSERVICE")) {
    return {
      ...state,
      currentService: action.payload,
    }
  }
  else if ((action.type == "SETOPTIONS")) {
    return {
      ...state,
      options: action.payload,
    }
  }
  else {
    return state;
  }
};

export default reducer;
