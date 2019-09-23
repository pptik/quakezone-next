import { FunctionComponent, useEffect, useState } from "react";
import { TextField, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
}));

const TextFieldEntry: FunctionComponent<{ 
  label: string, value?: string, suffix?: string, missingText?: string,
  [prop: string]: any }> = ({ label, value, suffix, missingText, ...props }) => {
  const classes = useStyles();
  const defaultValue = value != undefined ? value : (missingText || " ");
  return (
    <TextField label={label} defaultValue={defaultValue}
      InputProps={{
        readOnly: true,
        endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
      }} margin="normal" {...props} />
  );
};

export default TextFieldEntry;
