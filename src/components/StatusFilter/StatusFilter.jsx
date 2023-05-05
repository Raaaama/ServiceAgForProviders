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

import "../Filter/Filter.css";

const fc = {
  width: "20vw",
};

const select = {
  color: "white",
  fontFamily: "Manrope",
  fontSize: "20px",
  border: "1px solid white"
};

function StatusFilter(props) {

  const { statusFilter, setStatusFilter } = props

  const handleChange = (event) => {
    setStatusFilter(event.target.value)
  };

  return (
    <Box className="filters">
      <FormControl sx={fc}>
        <Select
          id="demo-simple-select"
          value={statusFilter}
          sx={select}
          onChange={handleChange}
        >
            <MenuItem value={-1}>{"Все статусы"}</MenuItem>
          <MenuItem value={0}>{"На рассмотрении"}</MenuItem>
          <MenuItem value={1}>{"Принято"}</MenuItem>
          <MenuItem value={2}>{"Отклонено"}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, statusFilter: state.statusFilter };
};

export default connect(mapStateToProps, actions)(StatusFilter);
