import { useState } from "react";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import { connect } from "react-redux";
import * as actions from "../src/redux/actions"
import Register from "./components/Register/Register";
import Enrollments from "./components/Enrollments/Enrollments";
import Settings from "./components/Settings/Settings";
import ServiceModal from "./components/ServiceModal/ServiceModal";

function App(props) {
  const {uid, showLogIn, showReg, showEnrollments, showModal, showServiceModal} = props

  const logIn = showLogIn ? <LogIn /> : null
  const reg = showReg ? <Register /> : null
  const enrollments = showEnrollments ? <Enrollments /> : null
  const modal = showModal ? <Settings /> : null
  const serviceModal = showServiceModal ? <ServiceModal /> : null

  return (
    <div className="App">
      {logIn}
      {reg}
      {enrollments}
      {modal}
      {serviceModal}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showLogIn: state.showLogIn, showReg: state.showReg, showEnrollments:state.showEnrollments, showModal:state.showModal, showServiceModal: state.showServiceModal };
};

export default connect(mapStateToProps, actions)(App);
