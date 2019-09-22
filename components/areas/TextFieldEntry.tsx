import { FunctionComponent, useEffect, useState } from "react";
import { TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const TextFieldEntry: FunctionComponent<{ label: string, value?: string, [prop: string]: any }> = ({ label, value, ...props }) => {
    const classes = useStyles();
    return (
        <TextField label={label} defaultValue={value}
            InputProps={{readOnly: true}} margin="normal" {...props} />
    );
};

export default TextFieldEntry;
