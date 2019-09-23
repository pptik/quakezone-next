
import clsx from "clsx";
import config from "..\\config.json";
import DashboardLayout from "..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";
import ItemGridStandard from "..\\components\\areas\\ItemGridStandard";

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
  
function Quakes() {
  const classes = useStyles();
  // Queries
  const quakes = useQuery(gql`
  {
  quakes2 {
    id, mw, name, noaaLocation, noaaTsunami, originTime
  } 
}
`, {
  });
  // Item mappers
  const quakesItemMapper = (it: any) => ({
    "title": it.name,
    "icon": (it.noaaTsunami ? 'water' : 'wifi'),
    "iconBackground": (it.mw >= 7 ? 'red' : 'silver'),
    "subheader": dateFns.format(dateFns.parseISO(it.originTime), "PPpppp"),
    "linkTo": (`/quakes/${it.id}`),
  });
  
  return (
    <DashboardLayout
      title="Earthquakes"
      avatarIcon="wifi"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
          {quakes.loading && <CircularProgress />}
    {quakes.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="quakes-snackbar"
      message={
        <span id="quakes-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {quakes.error.message}
        </span>
      }
    />}
    {!quakes.loading && !quakes.error &&     <ItemGridStandard
      items={quakes.data.quakes2.map(quakesItemMapper)}
>
        </ItemGridStandard>
        }

    </DashboardLayout>
  );
}

export default Quakes;
