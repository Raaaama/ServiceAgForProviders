import axios from "axios";
import { useEffect, useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Enrollments.css"
import BasicTable from "../Table/Table";


function Enrollments(props) {

  const [enrollments, setEnrollments] = useState([])

  const { ip, uid } = props

  const config = {
    headers: {
      "Access-Control-Allow-Origin": props.ip,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  };

  const getEnrollments = () => {
    axios
      .get(
        ip +
          "/api/enrollments/provider?idp=" + uid, config
      )
      .then((res) => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          let time = new Date(data[i].signUpDate)
          time = time.getTime() + 6 * 60 * 60000;
          time = new Date(time);
          time = time.toISOString();
          data[i].signUpDate = data[i].signUpDate.substring(0,10) + " " + time.substring(11,16)
          // console.log(data[i].signUpDate.substring(0,9) + " " + time.substring(11,15))
        }
        setEnrollments(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEnrollments();
  });

  return (
    <div>
      <h1>Записи</h1>
      <BasicTable data = {enrollments}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showReg: state.showReg };
};

export default connect(mapStateToProps, actions)(Enrollments);