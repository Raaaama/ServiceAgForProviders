import axios from "axios";
import { useEffect, useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Enrollments.css";
import BasicTable from "../Table/Table";
import Header from "../Header/Header";
import OptionFilter from "../Filter/OptionFilter";
import StatusFilter from "../StatusFilter/StatusFilter";
import ServiceFilter from "../ServiceFilter/ServiceFilter";

function Enrollments(props) {
  const { ip, uid, enrollments, setEnrollments } = props;

  const config = {
    headers: {
      "Access-Control-Allow-Origin": props.ip,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
  };

  const getEnrollments = () => {
    axios
      .get(ip + "/api/enrollments/provider?idp=" + uid, config)
      .then((res) => {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          let time = new Date(data[i].signUpDate);
          time = time.getTime() + 6 * 60 * 60000;
          time = new Date(time);
          time = time.toISOString();
          data[i].signUpDate =
            data[i].signUpDate.substring(0, 10) + " " + time.substring(11, 16);
        }
        setEnrollments(data);
        // console.log(uid)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEnrollments();
  }, []);

  return (
    <div>
      <Header />
      <h1>Записи</h1>
      <div className="filters">
        <ServiceFilter enrollments={enrollments}/>
        <OptionFilter data={enrollments}/>
        <StatusFilter />
      </div>
      <BasicTable data={enrollments} getEnrollments={getEnrollments} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showReg: state.showReg, enrollments: state.enrollments};
};

export default connect(mapStateToProps, actions)(Enrollments);
