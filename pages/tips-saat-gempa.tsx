import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";

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
  
function TipsSaatGempa() {
  const classes = useStyles();
  // Queries
  // Item mappers
  const hello3ItemMapper = (it: any) => ({
  });
  

  return (
    <DashboardLayout
      title="Tips Saat Gempa"
      avatarIcon="paw"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
            <Greeting
                who={"Devi item jelekkkkk"}
                                          />
    </DashboardLayout>
  );
}

export default TipsSaatGempa;
