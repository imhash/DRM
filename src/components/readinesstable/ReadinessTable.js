import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Services } from "../../pages";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ReadinessTable(rt) {
  const classes = useStyles();

  if (rt.data == null) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="caption table">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            {rt.data.map((row) => (
              <TableCell>{row.value1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {rt.data.map((row) => (
              <TableCell>{row.value2}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
