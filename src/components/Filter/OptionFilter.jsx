import axios from "axios";
import { useEffect, useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./Filter.css";

const fc = {
  width: "20vw",
};

const select = {
  color: "white",
  fontFamily: "Manrope",
  fontSize: "20px",
  border: "1px solid white"
};

function OptionFilter(props) {

  let enrollments = props.data

  const { optionFilter, setOptionFilter} = props
  
  let options = [];
  enrollments.forEach(e => {
    let f = false

    for (let i = 0; i < options.length; i++) {
      if (options[i].id == e.idoption) {
        f = true
        break
      }
    }
    if (f == false) {
      options.push(
        {name: e.opt,
        id: e.idoption})
    }

  });

  // console.log(options)

  const handleChange = (event) => {
    setOptionFilter(event.target.value)
  };

  return (
    <Box className="filters">
      <FormControl sx={fc}>
        {/* <InputLabel id="demo-simple-select-label">Опция</InputLabel> */}
        <Select
          //   labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionFilter}
          sx={select}
          onChange={handleChange}
        >
          <MenuItem value={-1}>Все опции</MenuItem>
          {options.map((e) => (
            <MenuItem key={e.id} value={e.id}>{enrollments[0].optionname + " " + e.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, optionFilter: state.optionFilter };
};

export default connect(mapStateToProps, actions)(OptionFilter);
