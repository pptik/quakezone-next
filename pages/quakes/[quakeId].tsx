
import clsx from "clsx";
import DashboardLayout from "..\\..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";
import TextField from "..\\..\\components\\areas\\TextField";

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
  
function QuakeId() {
  const classes = useStyles();
  // Queries
  // Item mappers
  const quakeDetail_nameItemMapper = (it: any) => ({
  });
  

  return (
    <DashboardLayout
      title="Quake detail"
      avatarIcon="wifi"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
            <TextField
                label={"Name"}
                                          />
    </DashboardLayout>
  );
}

export default QuakeId;
