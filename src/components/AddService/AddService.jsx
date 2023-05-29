import axios from "axios";
import { useEffect, useState } from "react";
import { encode, decode } from "js-base64";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { refreshMyServices, refreshNewServices } from "../../functions.jsx";
import { useDispatch } from "react-redux";

import "../Filter/Filter.css";

const fc = {
  width: "100%",
};

const select = {
  color: "black",
  fontFamily: "Manrope",
  fontSize: "16px",
  //   alignText: "center",
  width: "100%",
  //   border: "1px solid white",
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

function AddService(props) {
  const { ip, uid, config, newServices, setMyServices, setNewServices } = props;

  const [newService, setNewService] = useState("");

  const handleChange = (event) => {
    setNewService(event.target.value);
  };

  const dispatch = useDispatch();

  async function addNewService(ids) {
    try {
      await axios
        .post(ip + "/api/service", {
          idst: ids,
          idp: uid,
        }).then((res) => {
          axios
            .post(ip + "/api/optiontype", {
              ids: res.data.insertId,
            })
        })
        .catch((err) => console.log(err));
      refreshMyServices(ip, uid, config, dispatch);
      refreshNewServices(ip, uid, config, dispatch);
      setNewService(newServices[0].idservice_type)
      return 0;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h3>Добавить услугу:</h3>
      <Box>
        <FormControl sx={fc}>
          {/* <InputLabel id="demo-simple-select-label">Опция</InputLabel> */}
          <Select
            //   labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newService}
            sx={select}
            onChange={handleChange}
          >
            {newServices.map((e) => (
              <MenuItem key={e.idservice_type} value={e.idservice_type}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <Button
        variant="outlined"
        sx={btn}
        onClick={() => addNewService(newService)}
      >
        Добавить
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ip: state.ip,
    uid: state.uid,
    config: state.config,
    newServices: state.newServices,
  };
};

export default connect(mapStateToProps, actions)(AddService);
