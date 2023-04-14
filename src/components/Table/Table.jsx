import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Select from "../Select/Select"

const cellStyle = {
  color: "white",
  fontFamily: "Manrope",
  fontSize:"20px"
}

export default function BasicTable(props) {
  const rows = props.data;
  const {getEnrollments} = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: "#141414" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle} align="right">Имя</TableCell>
            <TableCell sx={cellStyle} align="right">Номер телефона</TableCell>
            <TableCell sx={cellStyle} align="right">Опция</TableCell>
            <TableCell sx={cellStyle} align="right">Дата, время</TableCell>
            <TableCell sx={cellStyle} align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idenrollment}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={cellStyle} align="right">{row.username}</TableCell>
              <TableCell sx={cellStyle} align="right">{row.telnum}</TableCell>
              <TableCell sx={cellStyle} align="right">{row.optionname} {row.opt}</TableCell>
              <TableCell sx={cellStyle} align="right">{row.signUpDate}</TableCell>
              {/* <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.approved}</TableCell> */}
              <TableCell sx={cellStyle} align="right"><Select id={row.idenrollment} status={row.approved} getEnrollments={getEnrollments}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
