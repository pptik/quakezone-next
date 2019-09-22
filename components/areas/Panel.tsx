import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const Panel: FunctionComponent<{ children?: any[] }> = ({ children }) => {
    const classes = useStyles();
    return (
        <div>
            {children}
        </div>
    );
};

export default Panel;
