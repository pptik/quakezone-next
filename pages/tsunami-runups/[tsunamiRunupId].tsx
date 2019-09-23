
import clsx from "clsx";
import appConfig from "..\\..\\appConfig.json";
import DashboardLayout from "..\\..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";
import Panel from "..\\..\\components\\areas\\Panel";
import TextFieldEntry from "..\\..\\components\\areas\\TextFieldEntry";
import GeoPointEntry from "..\\..\\components\\areas\\GeoPointEntry";

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
  
function TsunamiRunupId() {
  const classes = useStyles();
  const router = useRouter();
  // Queries
  const tsunamiRunup_panel = useQuery(gql`
  query TsunamiRunupDetail($id: String!) {
  tsunamiRunup: tsunamiRunup(id: $id) {
    arrivalDay
    arrivalHour
    arrivalMinute
    country
    damageDescription
    damageMillionsDollars
    day
    deaths
    deathsDescription
    distanceFromSource
    doubtful
    firstMotion
    horizontalInundation
    hour
    housesDamaged
    housesDamagedDescription
    housesDestroyed
    housesDestroyedDescription
    id
    infoSource
    injuries
    injuriesDescription
    latitude
    locationName
    longitude
    minute
    month
    noaaTsunamiEventId
    noaaTsunamiRunupId
    period
    regionCode
    second
    state
    travelTimeHours
    travelTimeMinutes
    tsunamiSource
    typeOfMeasurement
    waterHeight
    year
 } 
}`, {
    "variables": {
      "id": router.query.tsunamiRunupId,
    },
  });
  // Item mappers

  // avoid page crash if titleExpr not ready yet
  let appBarTitle = "Tsunami Runup Detail";
  try {
    appBarTitle = tsunamiRunup_panel.data && `${tsunamiRunup_panel.data.tsunamiRunup.locationName} - Tsunami Runups`;
  } catch (e) {
    console.warn("Cannot evaluate page title:", "tsunamiRunup_panel.data && `${tsunamiRunup_panel.data.tsunamiRunup.locationName} - Tsunami Runups`", e);
  }

  return (
    <DashboardLayout
      title={appBarTitle}
      avatarIcon="water"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
          {tsunamiRunup_panel.loading && <CircularProgress />}
    {tsunamiRunup_panel.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="tsunamiRunup_panel-snackbar"
      message={
        <span id="tsunamiRunup_panel-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {tsunamiRunup_panel.error.message}
        </span>
      }
    />}
    {!tsunamiRunup_panel.loading && !tsunamiRunup_panel.error &&     <Panel
>
          <TextFieldEntry
            label="Location"
            value={tsunamiRunup_panel.data.tsunamiRunup.locationName} />
          <GeoPointEntry
            label="Tsunami source location"
            featureName={tsunamiRunup_panel.data.tsunamiRunup.locationName}             mapboxApiAccessToken={appConfig.MAPBOX_API_ACCESS_TOKEN}             featureLat={tsunamiRunup_panel.data.tsunamiRunup.latitude}             featureLon={tsunamiRunup_panel.data.tsunamiRunup.longitude} />
        </Panel>
        }

    </DashboardLayout>
  );
}

export default TsunamiRunupId;
