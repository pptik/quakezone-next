import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import Greeting from "../components/areas/Greeting";


const useStyles = makeStyles(theme => ({
  }));
  
function Index() {
  const classes = useStyles();

  return (
    <DashboardLayout avatarUrl="/static/favicon.png">
            <Greeting
                  who="Devi"
                  />
            <Greeting
                  who="Helmi"
                  />
          </DashboardLayout>
  );
}

export default Index;
