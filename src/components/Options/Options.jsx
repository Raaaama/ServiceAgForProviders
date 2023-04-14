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
    color:"black",
    outline:"black",
    fontFamily:"Manrope",
    border:"2px solid black",
    '&:hover': {
      backgroundColor: '#000',
      color: '#FFF',
      border:"2px solid black",
  },
  }

const redBtn = {
    width: "100%",
    color:"red",
    outline:"red",
    fontFamily:"Manrope",
    border:"2px solid red",
    '&:hover': {
      backgroundColor: 'red',
      color: '#FFF',
      border:"2px solid red",
  },
  }

export default function Options(props) {
  const { options, hasOptions } = props;

  
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
      {/* {options.map((el) => (
        <div key={el.idoption}>
          <TextField
            defaultValue={hasOptions ? el.opt : ""}
            id="outlined-basic"
            label="Опция"
            variant="outlined"
            sx={input}
          />
          <br></br>
          <br></br>
        </div>
      ))} */}
      <BasicSelect options={options} />
      <OptionEditor />
      <br></br>
      <TimeSlider />
      <br></br>
      <Button variant="outlined" sx={btn}>Добавить опцию</Button>
      <br></br>
      <br></br>
      <Button variant="outlined" sx={redBtn}>Удалить выбранную</Button>
      <br></br>
      <br></br>
      <Button key="refresh" variant="outlined" sx={btn}>Обновить</Button>
    </div>
  );
}
