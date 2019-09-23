
import clsx from "clsx";
import appConfig from "..\\appConfig.json";
import DashboardLayout from "..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";
import Panel from "..\\components\\areas\\Panel";

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
  
function TsunamiSourceId() {
  const classes = useStyles();
  const router = useRouter();
  // Queries
  const tsunamiSource_panel = useQuery(gql`
  query TsunamiSourceDetail($id: String!) {
  tsunamiSources(id: $id) {
    causeCode
    country
    damageDescription
    damageMillionsDollars
    day
    deaths
    deathsDescription
    eventValidity
    focalDepth
    hour
    housesDamaged
    housesDamagedDescription
    housesDestroyed
    housesDestroyedDescription
    id
    injuries
    injuriesDescription
    latitude
    locationName
    longitude
    maxWaterHeight
    minute
    missing
    missingDescription
    month
    primaryMagnitude
    regionCode
    second
    state
    totalDamageMillionsDollars
    totalDamageMillionsDollarsDescription
    totalDeaths
    totalDeathsDescription
    totalHousesDamaged
    totalHousesDamagedDescription
    totalHousesDestroyed
    totalHousesDestroyedDescription
    totalInjuries
    totalInjuriesDescription
    totalMissing
    totalMissingDescription
    warningStatus
    year
    tsunamiMagnitudeAbe
    tsunamiMagnitudeIida
    tsunamiIntensitySoloviev
    noaaTsunamiEventId
    infoSource
 } 
}`, {
    "variables": {
      "id": router.query.tsunamiSourceId,
    },
  });
  // Item mappers

  // avoid page crash if titleExpr not ready yet
  let appBarTitle = "Tsunami Source Detail";
  try {
    appBarTitle = tsunamiSource_panel.data && `${tsunamiSource_panel.data.tsunamiSource.name} - Tsunami Sources`;
  } catch (e) {
    console.warn("Cannot evaluate page title:", "tsunamiSource_panel.data && `${tsunamiSource_panel.data.tsunamiSource.name} - Tsunami Sources`", e);
  }

  return (
    <DashboardLayout
      title={appBarTitle}
      avatarIcon="water"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
          {tsunamiSource_panel.loading && <CircularProgress />}
    {tsunamiSource_panel.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="tsunamiSource_panel-snackbar"
      message={
        <span id="tsunamiSource_panel-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {tsunamiSource_panel.error.message}
        </span>
      }
    />}
    {!tsunamiSource_panel.loading && !tsunamiSource_panel.error &&     <Panel
>
        </Panel>
        }

    </DashboardLayout>
  );
}

export default TsunamiSourceId;
