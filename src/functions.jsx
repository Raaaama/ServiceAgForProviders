import axios from "axios";
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import { useDispatch } from "react-redux";

export function refreshMyServices(ip, uid, config, dispatch) {
  axios.get(ip + "/api/service?idp=" + uid, config).then((res) => {
    dispatch(actions.setMyServices(res.data));
  });
}

export function refreshNewServices(ip, uid, config, dispatch) {
  axios.get(ip + "/api/servicetypes/new?idp=" + uid, config).then((res) => {
    dispatch(actions.setNewServices(res.data));
  });
}

export function deleteService(ip, uid, config, dispatch, id) {
  axios
    .post(ip + "/api/service/delete", {
      id: id,
    })
    .then(() => {
      refreshMyServices(ip, uid, config, dispatch);
      refreshNewServices(ip, uid, config, dispatch);
    });
}

export function getOptions(ip, config, idserv, dispatch) {
  axios
    .get(ip + "/api/option?idservices=" + idserv, config)
    .then((res) => {
      dispatch(actions.setOptions(res.data));
    })
    .catch((err) => console.log(err));
}