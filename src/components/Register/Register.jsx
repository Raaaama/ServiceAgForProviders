import axios from "axios";
import { useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

function Register(props) {
  const [emadress, setEmadress] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
//   const [telnum, setTelnum] = useState("");

//   const handleTelNum = event => {
//     const { value, maxLength } = event.target;
//     const message = value.slice(0, maxLength);

//     setTelnum(message)
//   };

  const RegSubmit = () => {
    axios.post(props.ip + '/api/providers', {
        emadress: emadress,
        password: encode(password),
        name: name,
        adress: adress,
      })
      .then((res) => {
        alert(res.data.res)
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
      {/* <input
        className="input"
        name="phonenum"
        type="number"
        maxLength="11"
        placeholder="Номер телефона"
        value={telnum}
        onChange={(e) => {
          handleTelNum(e);
        }}
      />
      <br></br> */}
      <input
        className="input"
        type="text"
        name="providername"
        placeholder="Название"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br></br>
      <input
        className="input"
        type="text"
        name="adress"
        placeholder="Адрес"
        onChange={(e) => {
          setAdress(e.target.value);
        }}
      />
      <br></br>
      <button onClick={RegSubmit}>Зарегистрироваться</button>
      <h4 onClick={() => {props.setShowLogIn(true)
        props.setShowReg(false)}} className="clickableText">
        Уже зарегистрирован
      </h4>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showReg: state.showReg };
};

export default connect(mapStateToProps, actions)(Register);
