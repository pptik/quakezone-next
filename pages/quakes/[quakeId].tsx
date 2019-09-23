
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
  
function QuakeId() {
  const classes = useStyles();
  const router = useRouter();
  // Queries
  const quakeDetail_panel = useQuery(gql`
  query QuakeDetail($id: String!) {
  quake(id: $id) {
    id, usgsId, name, usgsName,
originTime, usgsOriginTime, irisOriginTime,
noaaLocation, noaaTsunami, 
noviantyRuptureDuration, noviantyPWaveDominantPeriod, noviantyT0xtd, noviantyMw,
mw, usgsMw, irisMw, noaaTsunami, noaaTsunamiEventId, unknown1,
usgsDepth, collectionName, collectionPos, usgsEpicenter
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
>
          <TextFieldEntry
            label="Name"
            value={quakeDetail_panel.data.quake.name} />
          <GeoPointEntry
            label="Epicenter (USGS)"
            featurePoint={quakeDetail_panel.data.quake.usgsEpicenter}             featureName={quakeDetail_panel.data.quake.name}             mapboxApiAccessToken={appConfig.MAPBOX_API_ACCESS_TOKEN} />
          <TextFieldEntry
            label="Origin time"
            value={dateFns.format(dateFns.parseISO(quakeDetail_panel.data.quake.originTime), "PPpppp")} />
          <TextFieldEntry
            label="Origin time (USGS)"
            value={quakeDetail_panel.data.quake.usgsOriginTime} />
          <TextFieldEntry
            label="Origin time (IRIS)"
            value={quakeDetail_panel.data.quake.irisOriginTime} />
          <TextFieldEntry
            label="Location (NOAA)"
            value={quakeDetail_panel.data.quake.noaaLocation} />
          <TextFieldEntry
            label="Rupture duration (Novianty)"
            suffix="seconds"
            value={quakeDetail_panel.data.quake.noviantyRuptureDuration} />
          <TextFieldEntry
            label="P-wave dominant period (Novianty)"
            suffix="seconds"
            value={quakeDetail_panel.data.quake.noviantyPWaveDominantPeriod} />
          <TextFieldEntry
            label="T0 × Td (Novianty)"
            value={quakeDetail_panel.data.quake.noviantyT0xtd} />
          <TextFieldEntry
            label="Mw"
            value={quakeDetail_panel.data.quake.mw} />
          <TextFieldEntry
            label="Mw (Novianty)"
            value={quakeDetail_panel.data.quake.noviantyMw} />
          <TextFieldEntry
            label="Mw (USGS)"
            value={quakeDetail_panel.data.quake.usgsMw} />
          <TextFieldEntry
            label="Mw (IRIS)"
            value={quakeDetail_panel.data.quake.irisMw} />
          <TextFieldEntry
            label="Tsunami (NOAA)"
            value={quakeDetail_panel.data.quake.noaaTsunami} />
          <TextFieldEntry
            label="Depth (USGS)"
            suffix="km"
            value={quakeDetail_panel.data.quake.usgsDepth} />
        </Panel>
        }

    </DashboardLayout>
  );
}

export default QuakeId;
