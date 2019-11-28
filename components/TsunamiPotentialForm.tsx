import { makeStyles, Button } from "@material-ui/core";
import { FunctionComponent, useState, FormEvent } from "react";
import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as tf from '@tensorflow/tfjs';

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
  let [model, setModel] = useState(undefined as any);

  const loadModel = async () => {
    console.log('Loading model...');
    setModel(await tf.loadLayersModel('/static/novianty2018-tfjs/model.json'));
    console.log('Loaded');
  }
  
  /**
   *   Predict tsunami potential.

  :param t0: Unnormalized rupture duration variable
  :param td: Unnormalized P-wave dominant period variable
  :param mw: Unnormalized moment magnitude (M_w)

   * 
   * @param t0 
   * @param td 
   * @param mw 
   */
  const predict = async (t0: number, td: number, mw: number) => {
    // # Raw inputs
    const in_bias = 1
    const t0xtd = t0 * td

    // Normalization vectors
    const ri_min = [0, 9.45, 2.7, 42.54644, 6.987921]
    const ri_max = [1, 203.8708, 7.5, 877.4648, 8.995652]
    
    const t0_norm = (t0 - ri_min[1]) / (ri_max[1] - ri_min[1])
    const td_norm = (td - ri_min[2]) / (ri_max[2] - ri_min[2])
    const t0xtd_norm = (t0xtd - ri_min[3]) / (ri_max[3] - ri_min[3])
    const mw_norm = (mw - ri_min[4]) / (ri_max[4] - ri_min[4])
    const x = [in_bias, t0_norm, td_norm, t0xtd_norm, mw_norm]

    console.info('Inputs:', x);
    const y = await model.predict(tf.tensor([x])).array();
    console.info('Tsunami potential output neurons: Yes=', y[0][0], ' No=', y[0][1])
    // console.info('Tsunami potential: Yes=%s No=%s' % (float(y[0]) >= 0.5, float(y[1]) >= 0.5))

    return {'tsunamiYes': y[0][0], 'tsunamiNo': y[0][1]};
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {mw: parseFloat(mw), t0: parseFloat(t0), td: parseFloat(td)};
    console.log("Predict", mw, t0, td, data);
    // const resp = await fetch("http://localhost:5000/tsunamiPotential/predict", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // });
    // const respJson = await resp.json();
    // console.log("Resp:", respJson);
    // setPotential(respJson);

    const respJson = await predict(data.t0, data.td, data.mw);
    console.log("Resp:", respJson);
    setPotential(respJson);
  }

  React.useEffect(() => {
    loadModel();
  }, []);

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
