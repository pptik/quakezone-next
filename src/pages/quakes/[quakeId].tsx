
import clsx from "clsx";
import appConfig from "..\\..\\appConfig.json";
import DashboardLayout from "..\\..\\components\\DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DateTime } from 'luxon';
import Panel from "..\\..\\components\\areas\\Panel";
import TextFieldEntry from "..\\..\\components\\areas\\TextFieldEntry";
import GeoPointEntry from "..\\..\\components\\areas\\GeoPointEntry";
import LinkEntry from "..\\..\\components\\areas\\LinkEntry";

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
  const panel = useQuery(gql`
  query QuakeDetail($id: ID!) {
  quake(id: $id) {
    id, usgsId, name, usgsName,
    originTime, usgsOriginTime, irisOriginTime,
    noaaLocation, noaaTsunami,
    noviantyRuptureDuration, noviantyPWaveDominantPeriod, noviantyT0xtd, noviantyMw,
    mw, usgsMw, irisMw, noaaTsunamiEventId, unknown1,
    usgsDepth, collectionName, collectionPos, usgsEpicenter { type, coordinates }
  }
}`, {
    "variables": {
      "id": router.query.quakeId,
    },
  });
  // Item mappers

  // avoid page crash if titleExpr not ready yet
  let appBarTitle = "Quake detail";
  try {
    appBarTitle = panel.data && `${panel.data.quake.name} - Earthquakes`;
  } catch (e) {
    console.warn("Cannot evaluate page title:", "panel.data && `${panel.data.quake.name} - Earthquakes`", e);
  }

  return (
    <DashboardLayout
      title={appBarTitle}
      avatarIcon="wifi"
      avatarIconSet="Ionicons"
      avatarUrl="/favicon.png">
          {panel.loading && <CircularProgress />}
    {panel.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="panel-snackbar"
      message={
        <span id="panel-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {panel.error.message}
        </span>
      }
    />}
    {!panel.loading && !panel.error &&     <Panel
>
          <TextFieldEntry
            label="Name"
            value={panel.data.quake.name} />
          <GeoPointEntry
            label="Epicenter (USGS)"
            featurePoint={panel.data.quake.usgsEpicenter}             featureName={panel.data.quake.name}             mapboxApiAccessToken={appConfig.MAPBOX_API_ACCESS_TOKEN} />
          <TextFieldEntry
            label="Origin time"
            value={DateTime.fromISO(panel.data.quake.originTime).toFormat("fff")} />
          <TextFieldEntry
            label="USGS origin time"
            value={DateTime.fromISO(panel.data.quake.usgsOriginTime).toFormat("fff")} />
          <TextFieldEntry
            label="IRIS origin time"
            value={DateTime.fromISO(panel.data.quake.irisOriginTime).toFormat("fff")} />
          <TextFieldEntry
            label="NOAA Location"
            value={panel.data.quake.noaaLocation} />
          <TextFieldEntry
            label="Tsunami (NOAA)"
            value={panel.data.quake.noaaTsunami} />
          <TextFieldEntry
            label="Novianty rupture duration"
            suffix="s"
            value={panel.data.quake.noviantyRuptureDuration} />
          <TextFieldEntry
            label="Novianty P-wave dominant period"
            suffix="s"
            value={panel.data.quake.noviantyPWaveDominantPeriod} />
          <TextFieldEntry
            label="T0 × Td (Novianty)"
            value={panel.data.quake.noviantyT0xtd} />
          <TextFieldEntry
            label="Mw"
            value={panel.data.quake.mw} />
          <TextFieldEntry
            label="Mw (Novianty)"
            value={panel.data.quake.noviantyMw} />
          <TextFieldEntry
            label="Mw (USGS)"
            value={panel.data.quake.usgsMw} />
          <TextFieldEntry
            label="Mw (IRIS)"
            value={panel.data.quake.irisMw} />
          <TextFieldEntry
            label="NOAA Tsunami Event ID"
            value={panel.data.quake.noaaTsunamiEventId} />
          <TextFieldEntry
            label="USGS depth"
            suffix="km"
            value={panel.data.quake.usgsDepth} />
          <LinkEntry
            label="USGS event ID"
            target="_blank"
            href={`https://earthquake.usgs.gov/earthquakes/eventpage/${panel.data.quake.usgsId}/executive`}             title={panel.data.quake.usgsId} />
        </Panel>
        }

    </DashboardLayout>
  );
}

export default QuakeId;
