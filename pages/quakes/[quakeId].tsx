
import clsx from "clsx";
import DashboardLayout from "..\\..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";
import Panel from "..\\..\\components\\areas\\Panel";
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
  const router = useRouter();
  // Queries
  const quakeDetail_panel = useQuery(gql`
  query QuakeDetail($id: String!) {
  quake(id: $id) {
    id, mw, name, noaaLocation, noaaTsunami, originTime
  }
}
`, {
    "variables": {
      "id": router.query.quakeId,
    },
  });
  // Item mappers

  return (
    <DashboardLayout
      title="Quake detail"
      avatarIcon="wifi"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
          {quakeDetail_panel.loading && <CircularProgress />}
    {quakeDetail_panel.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="quakeDetail_panel-snackbar"
      message={
        <span id="quakeDetail_panel-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {quakeDetail_panel.error.message}
        </span>
      }
    />}
    {!quakeDetail_panel.loading && !quakeDetail_panel.error &&     <Panel

        />}

    </DashboardLayout>
  );
}

export default QuakeId;
