import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Select.css";

const menuItemStyle = {
    color: "black",
    fontFamily: "Manrope",
    fontSize:"20px"
}

const select = {
  color: "orange", 
  fontFamily: "Manrope", 
  fontSize:"20px", 
  backgroundColor: "#141414", 
}

function BasicSelect(props) {

  const { ip, id, status, getEnrollments } = props

  const handleChange = (event) => {
    axios.put(ip + '/api/enrollments', {
        id: id,
        status: event.target.value,
      })
      .then((res) => {
        getEnrollments();
      })
      .catch((err) => console.log(err));
  };

  if (status == 1) {
    return (
      <div>
        <h4 style={{color:"green"}}>Принято</h4>
      </div>
    )
  }

  else if (status == 2) {
    return (
      <div>
        <h4 style={{color:"red"}}>Отклонено</h4>
      </div>
    )
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
        //   labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label=""
          onChange={handleChange}
          sx = {select}
        >
          <MenuItem sx={menuItemStyle} value={0}>{"На рассмотрении"}</MenuItem>
          <MenuItem sx={menuItemStyle} value={1}>{"Принято"}</MenuItem>
          <MenuItem sx={menuItemStyle} value={2}>{"Отклонено"}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const mapStateToProps = (state) => {
    return { ip: state.ip };
  };
  
  export default connect(mapStateToProps, actions)(BasicSelect);
  