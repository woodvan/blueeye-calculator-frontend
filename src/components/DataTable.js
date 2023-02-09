import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    tableContainer: {
        marginTop: 30
    },
    table: {
        minWidth: 850,
    },
});


const DataTable = ({loading, data=[], removeRecord}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Operation</TableCell>
                    <TableCell align="center">User</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Response</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {loading && <TableRow>Loading...</TableRow>}
                {!loading && data && data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row" align="center">
                            {row.id}
                        </TableCell>
                        <TableCell align="center">{row.operation.type}</TableCell>
                        <TableCell align="center">{row.user.email}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.operationResponse}</TableCell>
                        <TableCell align="center">{row.createdAt}</TableCell>
                        <TableCell align="center">
                            <Button onClick={()=>removeRecord(row.id)} color="secondary" type="button" variant="contained">
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
