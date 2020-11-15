/* eslint-disable no-restricted-imports */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {},
}));


export const UsersTable = (props) => {

    const classes = useStyles();

    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell >Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.entities.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {user.firstname}
                                </TableCell>
                                <TableCell >{user.lastname}</TableCell>
                                <TableCell >{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}