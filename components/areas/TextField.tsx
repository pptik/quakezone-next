import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const TextField: FunctionComponent<{ label: string }> = ({ label }) => {
    const classes = useStyles();
    return (
        <Paper>
            {label}
        </Paper>
    );
};

export default TextField;
