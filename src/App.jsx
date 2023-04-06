import { useState } from "react";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import { connect } from "react-redux";
import * as actions from "../src/redux/actions"
import Register from "./components/Register/Register";
import Enrollments from "./components/Enrollments/Enrollments";

function App(props) {
  const {uid, showLogIn, showReg, showEnrollments} = props

  const logIn = showLogIn ? <LogIn /> : null
  const reg = showReg ? <Register /> : null
  const enrollments = showEnrollments ? <Enrollments /> : null

  return (
    <div className="App">
      {logIn}
      {reg}
      {enrollments}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showLogIn: state.showLogIn, showReg: state.showReg, showEnrollments:state.showEnrollments };
};

export default connect(mapStateToProps, actions)(App);
