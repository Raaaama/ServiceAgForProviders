import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { render } from 'react-dom';
import { useEffect } from 'react';

function valuetext(value) {
  return `${value}°C`;
}


export default function TimeSlider(props) {

  const { time } = props
  let min = +time.startTime.substring(0,2), max = +time.endTime.substring(0,2)
  const [value, setValue] = React.useState([min, max]);

  useEffect(() => {
    setValue([min, max])
  },[time]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={24}
        color="secondary"
        // onChangeCommitted={() => setValue([time.startTime, time.endTime])}
      />
    </Box>
  );
}