import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

const menuItemStyle = {
    color: "black",
    fontFamily: "Manrope",
    fontSize:"20px"
}

function BasicSelect(props) {

  const { ip, id, status, getEnrollments } = props

  const handleChange = (event) => {
    axios.put(ip + '/api/enrollments', {
        id: id,
        status: event.target.value,
      })
      .then((res) => {
        // alert(res.data.res)
        getEnrollments();
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
        //   labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label=""
          onChange={handleChange}
          sx = {{color: "white", fontFamily: "Manrope", fontSize:"20px", backgroundColor: "#141414", borderColor: "white"}}
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
  