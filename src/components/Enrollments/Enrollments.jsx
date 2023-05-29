import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Enrollments.css";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
// import CloseIcon from '@mui/icons-material/Close';

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

  function refreshEnrollments() {
    getEnrollments();
    handleClick();
  }

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

  //////////////////////////////////////////////////////////////////////

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
    </Fragment>
  );
  ///////////////////////////////////////////////////////

  return (
    <div>
      <Header />
      <h1>Записи</h1>
      <div className="filters">
        <ServiceFilter enrollments={enrollments}/>
        <OptionFilter data={enrollments}/>
        <StatusFilter />
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "4%", width: "4%", margin: "1%", cursor: "pointer" }} onClick={() => refreshEnrollments()} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path height="10px" width="10px" stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
      <BasicTable data={enrollments} getEnrollments={getEnrollments} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Заявки обновлены"
        action={action}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, showReg: state.showReg, enrollments: state.enrollments};
};

export default connect(mapStateToProps, actions)(Enrollments);
