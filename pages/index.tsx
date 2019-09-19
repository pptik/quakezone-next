import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import OpenWeather from "../components/areas/OpenWeather";

import Greeting from "../components/areas/Greeting";


const useStyles = makeStyles(theme => ({
  }));
  
function Index() {
  const classes = useStyles();

  return (
    <DashboardLayout
      title="QuakeZone"                  avatarUrl="/static/favicon.png">
            <OpenWeather
                apiKey={"3f26d574783375468ea4ba416796d8b9"}
                q={"London, UK"}
                                          />
            <Greeting
                who={"Devi"}
                                          />
            <Greeting
                who={"Helmi"}
                                          />
          </DashboardLayout>
  );
}

export default Index;
