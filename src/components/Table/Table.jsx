import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  const rows = props.data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: "#141414" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">Имя</TableCell>
            <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">Номер телефона</TableCell>
            <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">Опция</TableCell>
            <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">Дата, время</TableCell>
            <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.idenrollment}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.username}</TableCell>
              <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.telnum}</TableCell>
              <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.optionname} {row.opt}</TableCell>
              <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.signUpDate}</TableCell>
              <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.approved}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
