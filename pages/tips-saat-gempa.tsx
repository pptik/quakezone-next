import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import OpenWeather from "../components/areas/OpenWeather";

import Greeting from "../components/areas/Greeting";


const useStyles = makeStyles(theme => ({
  }));
  
function TipsSaatGempa() {
  const classes = useStyles();

  return (
    <DashboardLayout avatarUrl="/static/favicon.png">
            <OpenWeather
                  apiKey="3f26d574783375468ea4ba416796d8b9"
            q="Pekanbaru, ID"
                  />
            <Greeting
                  who="Devi item jelekkkkk"
                  />
          </DashboardLayout>
  );
}

export default TipsSaatGempa;
