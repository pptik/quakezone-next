
import clsx from "clsx";
import appConfig from "..\\appConfig.json";
import DashboardLayout from "..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DateTime } from 'luxon';
import Greeting from "..\\components\\areas\\Greeting";

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
  
  return (
    <DashboardLayout
      title="Tips Saat Gempa"
      avatarIcon="paw"
      avatarIconSet="Ionicons"
      avatarUrl="/favicon.png">
              <Greeting
      who="Devi"
      >
        </Greeting>
        

    </DashboardLayout>
  );
}

export default TipsSaatGempa;
