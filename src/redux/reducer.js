const initialState = {
  ip: "https://d652-2-135-26-114.ngrok-free.app",
  uid: "",
  showLogIn: true,
  showReg: false,
  showEnrollments: false,
  showModal: false,
  showServiceModal: false,
  showChartsModal: false,
  enrollments: [],
  images: [],
  config: {
    headers: {
      "Access-Control-Allow-Origin": "https://d652-2-135-26-114.ngrok-free.app",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  },
  info: {},
  myServices: [],
  newServices: [],
  currentService: {},
  options: [],
  optionFilter: -1,
  statusFilter: -1,
  serviceFilter: -1,
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
  else if ((action.type == "SETENROLLMENTS")) {
    return {
      ...state,
      enrollments: action.payload,
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
  else if ((action.type == "SETOPTIONFILTER")) {
    return {
      ...state,
      optionFilter: action.payload,
    }
  }
  else if ((action.type == "SETSTATUSFILTER")) {
    return {
      ...state,
      statusFilter: action.payload,
    }
  }
  else if ((action.type == "SETSERVICEFILTER")) {
    return {
      ...state,
      serviceFilter: action.payload,
    }
  }
  else if ((action.type == "SETNEWSERVICES")) {
    return {
      ...state,
      newServices: action.payload,
    }
  }
  else if ((action.type == "SETSHOWCHARTSMODAL")) {
    return {
      ...state,
      showChartsModal: action.payload,
    }
  }
  else {
    return state;
  }
};

export default reducer;
