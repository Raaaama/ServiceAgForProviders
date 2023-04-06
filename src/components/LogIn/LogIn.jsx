import axios from "axios";
import { useState, useContext } from "react";
import { encode, decode } from "js-base64";
import "./LogIn.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Register from "../Register/Register";

function LogIn(props) {
  const [emadress, setEmadress] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      "Access-Control-Allow-Origin": props.ip,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  };

  const LogInSubmit = () => {
    axios
      .get(
        props.ip +
          "/api/providers/check?" +
          "&emadress=" +
          emadress +
          "&password=" +
          encode(password),
        config
      )
      .then((res) => {
        // console.log(res)
        props.changeUid(res.data[0].idprovider)
        props.setShowLogIn(false)
        props.setShowEnrollments(true)
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div>
      <input
        className="input"
        type="text"
        name="username"
        placeholder="Логин"
        onChange={(e) => {
          setEmadress(e.target.value);
        }}
      />
      <br></br>
      <input
        className="input"
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br></br>
      <button onClick={LogInSubmit}>Войти</button>
      <br></br>
      <button onClick={() => {props.setShowLogIn(false)
        props.setShowReg(true)}}>Зарегистрироваться</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showReg: state.showReg };
};

export default connect(mapStateToProps, actions)(LogIn);
