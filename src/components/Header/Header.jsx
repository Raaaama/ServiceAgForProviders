import axios from "axios";
import { useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Header.css";

function Header(props) {
  const { ip, uid, config, setShowModal, setImages, setInfo, setMyServices } =
    props;

  function handleClick() {
    axios
      .get(ip + "/api/image?idp=" + uid, config)
      .then((res) => {
        let temp = [];
        res.data.forEach((el) => {
          temp.push(el.image_url);
        });
        setImages(temp);
      })
      .then(() => {
        axios
          .get(ip + "/api/providers/byidp/?idp=" + uid, config)
          .then((res) => {
            setInfo(res.data[0]);
          })
          .then(() => {
            axios
              .get(ip + "/api/service?idp=" + uid, config)
              .then((res) => {
                setMyServices(res.data);
              })
              .then(() => {
                setShowModal(true);
              })
              .catch((err) => console.log(err));
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
