import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import Select from "../Select/Select"

const cellStyle = {
  color: "white",
  fontFamily: "Manrope",
  fontSize:"20px"
}

function Row(props) {

  const { row, getEnrollments, optionFilter, statusFilter, serviceFilter } = props

  if (optionFilter == -1 || optionFilter == row.idoption) {
    if (statusFilter == -1 || statusFilter == row.approved) {
      if (serviceFilter == -1 || serviceFilter == row.idservices) {
        return (
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell sx={cellStyle} align="right">{row.name}</TableCell>
            <TableCell sx={cellStyle} align="right">{row.username}</TableCell>
            <TableCell sx={cellStyle} align="right">{row.telnum}</TableCell>
            <TableCell sx={cellStyle} align="right">{row.optionname} {row.opt}</TableCell>
            <TableCell sx={cellStyle} align="right">{row.signUpDate}</TableCell>
            {/* <TableCell sx={{color: "white", fontFamily: "Manrope", fontSize:"20px"}} align="right">{row.approved}</TableCell> */}
            <TableCell sx={cellStyle} align="right"><Select id={row.idenrollment} status={row.approved} getEnrollments={getEnrollments}/></TableCell>
          </TableRow>
        )
      }
    }
  }
}

function BasicTable(props) {
  const rows = props.data;
  const {optionFilter, statusFilter, serviceFilter, getEnrollments} = props

  React.useEffect(() => {
    getEnrollments();
  }, [optionFilter, statusFilter]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: "#141414" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle} align="right">Услуга</TableCell>
            <TableCell sx={cellStyle} align="right">Имя</TableCell>
            <TableCell sx={cellStyle} align="right">Номер телефона</TableCell>
            <TableCell sx={cellStyle} align="right">Опция</TableCell>
            <TableCell sx={cellStyle} align="right">Дата, время</TableCell>
            <TableCell sx={cellStyle} align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.idenrollment} optionFilter={optionFilter} statusFilter={statusFilter} serviceFilter={serviceFilter} row={row} getEnrollments={getEnrollments}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
  return { optionFilter: state.optionFilter, statusFilter: state.statusFilter, serviceFilter:state.serviceFilter };
};

export default connect(mapStateToProps, actions)(BasicTable);