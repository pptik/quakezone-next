import { FunctionComponent } from "react";
import { FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const TextFieldEntry: FunctionComponent<{ 
  label: string, href?: string, title?: string, target?: string, missingText?: string,
  [prop: string]: any }> = ({ label, href, title, target, missingText, ...props }) => {
  const classes = useStyles();
  return (
    <FormControl margin="normal">
      <InputLabel shrink={true}>{label}</InputLabel>
      {href && <a href={href} style={{marginTop: "1.2rem"}} target={target}>{title || href}</a>}
      {!href && <div style={{marginTop: "1.2rem"}}>{missingText}</div>}
    </FormControl>
  );
};

export default TextFieldEntry;
