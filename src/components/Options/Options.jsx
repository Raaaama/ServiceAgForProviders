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
import { useDispatch } from "react-redux";
import { getOptions } from "../../functions";

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

function Timetable(props) {
  const { ido, dayOfTheWeek, timetable, getTimetable } = props;
  if (ido != null && dayOfTheWeek != null)
    return (
      <div>
        {timetable.map((el, i) => (
          <TimeSlider key={i} time={el} {...props} />
        ))}
        <TimeSlider {...props} />
      </div>
    );
}

function Options(props) {
  const { ip, config, options, hasOptions, setOptions, currentService } = props;

  const [ido, setIdo] = useState();
  const [dayOfTheWeek, setDayOfTheWeek] = useState();
  const [timetable, setTimetable] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [op, setOp] = useState("");
  const [optionName, setOptionName] = useState("");

  let dispatch = useDispatch();

  function getTimetable(id, day) {
    if (id != undefined && day != undefined) {
      axios
        .get(
          ip + "/api/timetable?idoption=" + id + "&dayoftheweek=" + day,
          config
        )
        .then((res) => {
          setTimetable(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  function addNewOption() {
    if (newOption != "") {
      axios
        .post(ip + "/api/option", {
          idot: currentService.idoptiontypes,
          opt: newOption,
        })
        .then(() => {
          getOptions(ip, config, currentService.idservices, dispatch);
          setNewOption("");
        })
        .catch((err) => console.log(err));
    }
  }

  function deleteOption() {
    if (ido != undefined) {
      axios
        .post(ip + "/api/option/delete/", {
          ido: ido,
        })
        .then(() => {
          getOptions(ip, config, currentService.idservices, dispatch);
          setOp("");
        })
        .catch((err) => console.log(err));
    }
  }

  function updateOptionName() {
    if (optionName != "") {
      axios
        .put(ip + "/api/optiontype/", {
          name: optionName,
          idot: currentService.idoptiontypes,
        })
        .catch((err) => console.log(err));
        getOptions(ip, config, currentService.idservices, dispatch)
    }
  }

  function handleOption(ido) {
    setIdo(ido);
    getTimetable(ido, dayOfTheWeek);
  }

  function handleDayOfTheWeek(day) {
    setDayOfTheWeek(day);
    getTimetable(ido, day);
  }

  return (
    <div>
      <h2>Опции:</h2>
      <TextField
        defaultValue={currentService.optionname}
        id="outlined-basic"
        label="Название опции"
        variant="outlined"
        sx={input}
        onChange={(e) => setOptionName(e.target.value)}
      />
      <br></br>
      <br></br>
      <Button
        key="refresh"
        variant="outlined"
        sx={btn}
        onClick={() => updateOptionName()}
      >
        Обновить название
      </Button>
      <br></br>
      <br></br>
      <BasicSelect
        options={options}
        handleOption={handleOption}
        op={op}
        setOp={setOp}
      />
      <OptionEditor handleDayOfTheWeek={handleDayOfTheWeek} />
      <br></br>
      <Timetable
        ido={ido}
        dayOfTheWeek={dayOfTheWeek}
        timetable={timetable}
        getTimetable={getTimetable}
      />
      <h3>Добавить опцию:</h3>
      <TextField
        id="outlined-basic"
        label="Название новой опции"
        variant="outlined"
        sx={input}
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
      />
      <br></br>
      <br></br>
      <Button variant="outlined" sx={btn} onClick={() => addNewOption()}>
        Добавить опцию
      </Button>

      <br></br>
      <br></br>
      <Button variant="outlined" sx={redBtn} onClick={() => deleteOption()}>
        Удалить выбранную опцию
      </Button>
      <br></br>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ip: state.ip,
    config: state.config,
    uid: state.uid,
    options: state.options,
    currentService: state.currentService,
  };
};

export default connect(mapStateToProps, actions)(Options);
