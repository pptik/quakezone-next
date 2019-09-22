import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const TextField: FunctionComponent<{ label: string, value?: string }> = ({ label, value }) => {
    const classes = useStyles();
    return (
        <Paper>
            {label}: {value}
        </Paper>
    );
};

export default TextField;
