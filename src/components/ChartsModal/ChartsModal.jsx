import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import BarChart from "../BarChart/BarChart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "max-content",
  maxHeight: "80%",
  overflowX: "auto",
};

const modal = {
  color: "black",
  // overflowX: "scroll",
  // overflowY: "hidden",
};

function ChartsModal(props) {
  const { ip, uid, config, showChartsModal, setShowChartsModal, enrollments } = props;

  const unique = [...new Set(enrollments.map(item => item.name))]

  let temp = []

  for (let i = 0; i < unique.length; i++) {
    let n = 0;
    for (let j = 0; j < enrollments.length; j++) {
        if (unique[i] == enrollments[j].name) {
            n += 1;
        }
    }
    temp.push({
        name: unique[i],
        count: n
    })
  }

  const [data, setData] = useState({
    labels: temp.map((data) => data.name),
    datasets: [
      {
        label: "Кол-во записей",
        data: temp.map((data) => data.count),
        backgroundColor: [
          // "rgba(75,192,192,1)",
          // "#ecf0f1",
          // "#50AF95",
          // "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  let daysStat = [0,0,0,0,0,0,0]

  for (let i = 0; i < enrollments.length; i++) {
    // daysStat[enrollments[i].]
    let dt = new Date(enrollments[i].signUpDate)
    daysStat[dt.getDay()] += 1
  }

  const [daysData, setDaysData] = useState({
    labels: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
    datasets: [
      {
        label: "Кол-во записей",
        data: daysStat,
        backgroundColor: [
          // "rgba(75,192,192,1)",
          // "#ecf0f1",
          // "#50AF95",
          // "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      <Modal
        open={showChartsModal}
        onClose={() => setShowChartsModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        color="black"
        sx={modal}
      >
        <Box sx={style}>
          <BarChart chartData={data} />
          {/* <h1>charts</h1> */}
          <BarChart chartData={daysData} />
        </Box>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ip: state.ip,
    uid: state.uid,
    config: state.config,
    showChartsModal: state.showChartsModal,
    enrollments: state.enrollments
  };
};

export default connect(mapStateToProps, actions)(ChartsModal);
