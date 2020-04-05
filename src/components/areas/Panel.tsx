import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const Panel: FunctionComponent<{ children?: any, [key: string]: any }> = ({ children, ...props }) => {
    const classes = useStyles();
    const realChildren = !children || Array.isArray(children) ? children : [children];
    return (
        <Grid container {...props}>
            {realChildren && realChildren.map((child: JSX.Element, index: number) => (
                <Grid item key={index} xs={12} style={{display: "flex", flexDirection: "column"}}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

export default Panel;
