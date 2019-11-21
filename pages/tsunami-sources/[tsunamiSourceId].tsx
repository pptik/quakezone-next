
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
  
function TsunamiSourceId() {
  const classes = useStyles();
  const router = useRouter();
  // Queries
  const tsunamiSource_panel = useQuery(gql`
  query TsunamiSourceDetail($id: String!) {
  tsunamiSource: tsunamiSources(id: $id) {
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
    appBarTitle = tsunamiSource_panel.data && `${tsunamiSource_panel.data.tsunamiSource.locationName} - Tsunami Sources`;
  } catch (e) {
    console.warn("Cannot evaluate page title:", "tsunamiSource_panel.data && `${tsunamiSource_panel.data.tsunamiSource.locationName} - Tsunami Sources`", e);
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
          <TextFieldEntry
            label="Location"
            value={tsunamiSource_panel.data.tsunamiSource.locationName} />
          <GeoPointEntry
            label="Tsunami source location"
            featureName={tsunamiSource_panel.data.tsunamiSource.locationName}             mapboxApiAccessToken={appConfig.MAPBOX_API_ACCESS_TOKEN}             featureLat={tsunamiSource_panel.data.tsunamiSource.latitude}             featureLon={tsunamiSource_panel.data.tsunamiSource.longitude} />
          <TextFieldEntry
            label="Cause"
            value={tsunamiSource_panel.data.tsunamiSource.causeCode} />
          <TextFieldEntry
            label="Country"
            value={tsunamiSource_panel.data.tsunamiSource.country} />
          <TextFieldEntry
            label="Damage"
            prefix="USD"
            suffix="M"
            value={tsunamiSource_panel.data.tsunamiSource.damageMillionsDollars} />
          <TextFieldEntry
            label="Damage description"
            value={tsunamiSource_panel.data.tsunamiSource.damageDescription} />
          <TextFieldEntry
            label="Source event time"
            value={((it: any) => (`${it.year}-${it.month}-${it.day} ${it.hour}:${it.minute}:${it.second} UTC`))(tsunamiSource_panel.data.tsunamiSource)} />
          <TextFieldEntry
            label="Magnitude"
            value={tsunamiSource_panel.data.tsunamiSource.primaryMagnitude} />
          <TextFieldEntry
            label="Focal depth"
            suffix="km"
            value={tsunamiSource_panel.data.tsunamiSource.focalDepth} />
          <TextFieldEntry
            label="Max. water height"
            suffix="m"
            value={tsunamiSource_panel.data.tsunamiSource.maxWaterHeight} />
          <TextFieldEntry
            label="Warning status"
            value={tsunamiSource_panel.data.tsunamiSource.warningStatus} />
          <TextFieldEntry
            label="Region code"
            value={tsunamiSource_panel.data.tsunamiSource.regionCode} />
          <TextFieldEntry
            label="State"
            value={tsunamiSource_panel.data.tsunamiSource.state} />
          <TextFieldEntry
            label="Event validity"
            value={tsunamiSource_panel.data.tsunamiSource.eventValidity} />
          <TextFieldEntry
            label="Tsunami intensity (Soloviev)"
            value={tsunamiSource_panel.data.tsunamiSource.tsunamiIntensitySoloviev} />
          <TextFieldEntry
            label="Tsunami magnitude (Abe)"
            value={tsunamiSource_panel.data.tsunamiSource.tsunamiMagnitudeAbe} />
          <TextFieldEntry
            label="Tsunami magnitude (Iida)"
            value={tsunamiSource_panel.data.tsunamiSource.tsunamiMagnitudeIida} />
          <TextFieldEntry
            label="Deaths from tsunami"
            suffix="people"
            value={tsunamiSource_panel.data.tsunamiSource.deaths} />
          <TextFieldEntry
            label="Deaths from tsunami (description)"
            value={tsunamiSource_panel.data.tsunamiSource.deathsDescription} />
          <TextFieldEntry
            label="Injuries from tsunami"
            suffix="people"
            value={tsunamiSource_panel.data.tsunamiSource.injuries} />
          <TextFieldEntry
            label="Injuries from tsunami (description)"
            value={tsunamiSource_panel.data.tsunamiSource.injuriesDescription} />
          <TextFieldEntry
            label="People missing due to tsunami"
            suffix="people"
            value={tsunamiSource_panel.data.tsunamiSource.missing} />
          <TextFieldEntry
            label="People missing due to tsunami (description)"
            value={tsunamiSource_panel.data.tsunamiSource.missingDescription} />
          <TextFieldEntry
            label="Houses destroyed"
            suffix="houses"
            value={tsunamiSource_panel.data.tsunamiSource.housesDestroyed} />
          <TextFieldEntry
            label="Houses destroyed by tsunami (description)"
            value={tsunamiSource_panel.data.tsunamiSource.housesDestroyedDescription} />
          <TextFieldEntry
            label="Houses damaged by tsunami"
            suffix="houses"
            value={tsunamiSource_panel.data.tsunamiSource.housesDamaged} />
          <TextFieldEntry
            label="Houses damaged by tsunami (description)"
            value={tsunamiSource_panel.data.tsunamiSource.housesDamagedDescription} />
          <TextFieldEntry
            label="Total deaths"
            suffix="people"
            value={tsunamiSource_panel.data.tsunamiSource.totalDeaths} />
          <TextFieldEntry
            label="Total deaths (description)"
            value={tsunamiSource_panel.data.tsunamiSource.totalDeathsDescription} />
          <TextFieldEntry
            label="Total injuries"
            suffix="people"
            value={tsunamiSource_panel.data.tsunamiSource.totalInjuries} />
          <TextFieldEntry
            label="Total injuries (description)"
            value={tsunamiSource_panel.data.tsunamiSource.totalInjuriesDescription} />
          <TextFieldEntry
            label="Total missing"
            suffix="people"
            value={tsunamiSource_panel.data.tsunamiSource.totalMissing} />
          <TextFieldEntry
            label="Total missing (description)"
            value={tsunamiSource_panel.data.tsunamiSource.totalMissingDescription} />
        </Panel>
        }

    </DashboardLayout>
  );
}

export default TsunamiSourceId;
