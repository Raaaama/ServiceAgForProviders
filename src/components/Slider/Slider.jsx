import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { render } from 'react-dom';
import { useEffect } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

function TimeSlider(props) {

  const { ip, time, ido, dayOfTheWeek, getTimetable } = props

  let min = 0, max = 24

  if (time) {
    min = +time.startTime.substring(0,2), max = +time.endTime.substring(0,2)
  }

  const [value, setValue] = React.useState([min, max]);

  useEffect(() => {
    setValue([min, max])
  },[time]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function addZero(a) {
    if (a < 10) {
      a = "0" + a
    }
    return a
  }

  function deleteTimetable(id) {
    axios.post(ip + '/api/timetable/delete', {
      id: id,
    }).then(() => {
      getTimetable(ido, dayOfTheWeek)
    })
    .catch((err) => console.log(err));
  }

  function addTimetable() {
    axios.post(ip + '/api/timetable', {
      ido: ido,
      startTime: addZero(value[0]) + ":00:00",
      endTime: addZero(value[1]) + ":00:00",
      dayoftheweek: dayOfTheWeek,
    }).then(() => {
      getTimetable(ido, dayOfTheWeek)
    })
    .catch((err) => console.log(err));
  }

  return (
    <Box sx={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        min={0}
        max={24}
        color="secondary"
        sx={{ width: "90%", margin: "4px" }}
        // onChangeCommitted={() => setValue([time.startTime, time.endTime])}
      />
      {(time) ?
        <h3 style={{padding: "4px", margin: "4px", borderRadius: "20px", cursor: "pointer", }} onClick={() => deleteTimetable(time.idtimetable)}>×</h3>
        :
        <h3 style={{padding: "4px", margin: "4px", borderRadius: "20px", cursor: "pointer", }} onClick={() => addTimetable()}>+</h3>
        }
    </Box>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, config: state.config, uid: state.uid };
};

export default connect(mapStateToProps, actions)(TimeSlider);
