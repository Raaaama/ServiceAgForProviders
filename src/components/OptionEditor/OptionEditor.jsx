import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OptionEditor(props) {
  const [day, setDay] = React.useState("");

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  const days = ["Понедельник","Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]

  const {handleDayOfTheWeek} = props

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">День недели</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={day}
          label="День недели"
          onChange={handleChange}
        >
          {days.map((el, i) => (
            <MenuItem key={i} value={i} onClick={() => handleDayOfTheWeek(i + 1)}>{el}</MenuItem>
          ))} 
        </Select>
      </FormControl>
    </Box>
  );
}
