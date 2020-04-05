import { FunctionComponent, useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
}));

const TextFieldEntry: FunctionComponent<{ 
  label: string, value?: string, prefix?: string, suffix?: string, missingText?: string,
  [prop: string]: any }> = ({ label, value, prefix, suffix, missingText, ...props }) => {
  const classes = useStyles();
  const defaultValue = value != undefined ? value : (missingText || " ");
  return (
    <TextField label={label} defaultValue={defaultValue}
      InputProps={{
        readOnly: true,
        startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
        endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
      }} margin="normal" {...props} />
  );
};

export default TextFieldEntry;
