import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class CurrenciesList extends React.Component {
  render() {
    const {
      passedProps: { data }
    } = this.props;
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Symbol</TableCell>
                <TableCell align="right">Daily change</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Last Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row.symbol}</TableCell>
                  <TableCell align="right">{row.dailyChange}</TableCell>
                  <TableCell align="right">{row.volume}</TableCell>
                  <TableCell align="right">{row.lastPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}

export default CurrenciesList;
