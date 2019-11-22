import { makeStyles, Button } from "@material-ui/core";
import { FunctionComponent, useState, FormEvent } from "react";
import TextField from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    // display: "flex",
    // flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

interface Props {

}

const TsunamiPotentialForm: FunctionComponent<Props> = ({}) => {
  const classes = useStyles();
  const [mw, setMw] = useState("7.0");
  const [t0, setT0] = useState("5.0");
  const [td, setTd] = useState("5.0");
  const [potential, setPotential] = useState({tsunamiNo: undefined, tsunamiYes: undefined});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {mw: parseFloat(mw), t0: parseFloat(t0), td: parseFloat(td)};
    console.log("Predict", mw, t0, td, data);
    const resp = await fetch("http://localhost:5000/tsunamiPotential/predict", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const respJson = await resp.json();
    console.log("Resp:", respJson);
    setPotential(respJson);
  }

  return (
    <form className={classes.container} noValidate autoComplete="off"
      onSubmit={(e: FormEvent) => handleSubmit(e)}>
      <div>
        <h2>Predict Tsunami Potential</h2>
      </div>
      <div>
        <TextField required id="mw" type="number"
          label="mw"
          defaultValue={mw}
          className={classes.textField}
          margin="normal"
          onChange={e => setMw(e.target.value)}/>
        <TextField required id="t0" type="number"
          label="t0"
          defaultValue={t0}
          className={classes.textField}
          margin="normal"
          onChange={e => setT0(e.target.value)}/>
        <TextField required id="td" type="number"
          label="td"
          defaultValue={td}
          className={classes.textField}
          margin="normal"
          onChange={e => setTd(e.target.value)}/>
      </div>
      <div>
        <Button variant="contained" type="submit">Predict</Button>
      </div>
      {potential.tsunamiYes !== undefined && <div>
        <h3>Tsunami Potential</h3>
        <p>No: {potential.tsunamiNo}</p>
        <p>Yes: {potential.tsunamiYes}</p>
        <p>Conclusion: <strong>{(potential.tsunamiYes || 0) >= (potential.tsunamiNo || 0) ? "YES" : "NO"}</strong></p>
      </div>}
    </form>
  )
}

export default TsunamiPotentialForm;
