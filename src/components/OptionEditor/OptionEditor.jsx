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
          <MenuItem value={1}>Понедельник</MenuItem>
          <MenuItem value={2}>Вторник</MenuItem>
          <MenuItem value={3}>Среда</MenuItem>
          <MenuItem value={4}>Четверг</MenuItem>
          <MenuItem value={5}>Пятница</MenuItem>
          <MenuItem value={6}>Суббота</MenuItem>
          <MenuItem value={7}>Воскресенье</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
