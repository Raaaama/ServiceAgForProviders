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
  border: "1px solid white",
};

function ServiceFilter(props) {
//   const [services, setServices] = useState([]);

  const { ip, config, uid, serviceFilter, setServiceFilter, enrollments } = props;

  let services = [];
  enrollments.forEach((e) => {
    let f = false;

    for (let i = 0; i < services.length; i++) {
      if (services[i].id == e.idservices) {
        f = true;
        break;
      }
    }
    if (f == false) {
        services.push({ name: e.name, id: e.idservices });
    }
  });

  const handleChange = (event) => {
    setServiceFilter(event.target.value);
  };

  return (
    <Box className="filters">
      <FormControl sx={fc}>
        <Select
          id="demo-simple-select"
          value={serviceFilter}
          sx={select}
          onChange={handleChange}
        >
          <MenuItem value={-1}>{"Все услуги"}</MenuItem>
          {services.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    ip: state.ip,
    uid: state.uid,
    config: state.config,
    serviceFilter: state.serviceFilter,
  };
};

export default connect(mapStateToProps, actions)(ServiceFilter);
