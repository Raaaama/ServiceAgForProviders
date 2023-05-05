import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import TextField from "@mui/material/TextField";
import BasicSelect from "../Tabpanel/OptionSelect";
import OptionEditor from "../OptionEditor/OptionEditor";
import TimeSlider from "../Slider/Slider";

const input = {
  width: "100%",
};

const btn = {
  width: "100%",
  color: "black",
  outline: "black",
  fontFamily: "Manrope",
  border: "2px solid black",
  "&:hover": {
    backgroundColor: "#000",
    color: "#FFF",
    border: "2px solid black",
  },
};

const redBtn = {
  width: "100%",
  color: "red",
  outline: "red",
  fontFamily: "Manrope",
  border: "2px solid red",
  "&:hover": {
    backgroundColor: "red",
    color: "#FFF",
    border: "2px solid red",
  },
};

function Options(props) {
  const { ip, config, options, hasOptions } = props;

  const [ido, setIdo] = useState();
  const [dayOfTheWeek, setDayOfTheWeek] = useState();
  const [timetable, setTimetable] = useState([]);

  function getTimetable(id, day) {
    if (id != undefined && day != undefined) {
      axios
      .get(ip + "/api/timetable?idoption=" + id + "&dayoftheweek=" + day, config)
      .then((res) => {
        setTimetable(res.data)
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
    }
    
  }

  function handleOption(ido) {
    setIdo(ido)
    getTimetable(ido, dayOfTheWeek)
  }

  function handleDayOfTheWeek(day) {
    setDayOfTheWeek(day)
    getTimetable(ido, day)
  }

  return (
    <div>
      <h2>Опции:</h2>
      <TextField
        defaultValue={hasOptions ? options[0].optionname : ""}
        id="outlined-basic"
        label="Название опции"
        variant="outlined"
        sx={input}
      />
      <br></br>
      <br></br>
      <BasicSelect options={options} handleOption={handleOption}/>
      <OptionEditor handleDayOfTheWeek={handleDayOfTheWeek} />
      <br></br>
      {timetable.map((el, i) => (
        <TimeSlider key={i} time={el}/>
      ))}
      <br></br>
      <div className="addOpt">
        <TextField
          id="outlined-basic"
          label="Название новой опции"
          variant="outlined"
          sx={input}
        />
        <br></br>
        <br></br>
        <Button variant="outlined" sx={btn}>
          Добавить опцию
        </Button>
      </div>
      <br></br>
      <Button variant="outlined" sx={redBtn}>
        Удалить выбранную опцию
      </Button>
      <br></br>
      <br></br>
      <Button key="refresh" variant="outlined" sx={btn}>
        Обновить опцию
      </Button>
      <br></br>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, config: state.config, uid: state.uid };
};

export default connect(mapStateToProps, actions)(Options);

