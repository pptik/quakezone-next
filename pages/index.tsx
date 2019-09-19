import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import OpenWeather from "../components/areas/OpenWeather";

import Greeting from "../components/areas/Greeting";


const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
    marginBottom: "2rem",
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
  
function Index() {
  const classes = useStyles();

  return (
    <DashboardLayout
      title="QuakeZone"
      
      
      avatarUrl="/static/favicon.png">
      <OpenWeather
                apiKey={"3f26d574783375468ea4ba416796d8b9"}
                q={"Bandung, ID"}
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
