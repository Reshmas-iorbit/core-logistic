import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0)

];
console.log(rows, "helloo");
export default function TableData({ inputDetails }) {
  const array = Object.entries(inputDetails)
  const [tableData, setTableData] = React.useState(array)
  console.log(array);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h3>Field Name</h3></TableCell>
            <TableCell align="right"><h3>Values</h3></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((row) => (

            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                console.log(row, "row form map")
              }
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
