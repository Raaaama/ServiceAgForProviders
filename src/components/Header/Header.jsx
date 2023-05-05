import axios from "axios";
import { useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Header.css";
import { refreshMyServices, refreshNewServices } from "../../functions.jsx";
import { useDispatch } from "react-redux";

function Header(props) {
  const { ip, uid, config, setShowModal, setImages, setInfo, setMyServices, setNewServices } =
    props;

  const dispatch = useDispatch()

  function handleClick() {
    axios
      .get(ip + "/api/image?idp=" + uid, config)
      .then((res) => {
        setImages(res.data);
      })
      .then(() => {
        axios
          .get(ip + "/api/providers/byidp/?idp=" + uid, config)
          .then((res) => {
            setInfo(res.data[0]);
          })
          .then(() => {
            refreshMyServices(ip, uid, config, dispatch);
            refreshNewServices(ip, uid, config, dispatch);
            setShowModal(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="header" onClick={handleClick}>
      <h3 className="lk">Личный кабинет</h3>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, config: state.config };
};

export default connect(mapStateToProps, actions)(Header);
