import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  // const [op, setOp] = React.useState("");

  const { options, handleOption, op, setOp } = props;

  const handleChange = (event) => {
    setOp(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Опция</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={op}
          label="Опция"
          onChange={handleChange}
        >
          {options.map((el, i) => (
            <MenuItem key={i} value={el.idoption} onClick={() => handleOption(el.idoption)}>
              {el.opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <br></br>

    </Box>
  );
}
