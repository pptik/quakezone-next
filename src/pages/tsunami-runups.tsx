
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
  
function TsunamiRunups() {
  const classes = useStyles();
  // Queries
  const tsunamiRunups = useQuery(gql`
  {
  tsunamiRunups(orderBy: {sort: "year", direction: desc}, first: 100) {
    edges {
      node {
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
    }
  } 
}`, {
  });
  // Item mappers
  const tsunamiRunupsItemMapper = (it: any) => ({
    "icon": ("water"),
    "title": it.locationName,
    "subheader": (`${it.year}-${it.month}-${it.arrivalDay} ${it.arrivalHour}:${it.arrivalMinute} (${it.waterHeight} meters)`),
    "iconBackground": (it.waterHeight > 3 ? "red" : (it.waterHeight > 1 ? "orange" : "green")),
    "linkTo": (`/tsunami-runups/${it.id}`),
  });
  
  return (
    <DashboardLayout
      title="Tsunami Runups"
      avatarIcon="water"
      avatarIconSet="Ionicons"
      avatarUrl="/favicon.png">
          {tsunamiRunups.loading && <CircularProgress />}
    {tsunamiRunups.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="tsunamiRunups-snackbar"
      message={
        <span id="tsunamiRunups-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {tsunamiRunups.error.message}
        </span>
      }
    />}
    {!tsunamiRunups.loading && !tsunamiRunups.error &&     <ItemGridStandard
      items={tsunamiRunups.data.tsunamiRunups.edges.map((it: any) => it.node).map(tsunamiRunupsItemMapper)}
>
        </ItemGridStandard>
        }

    </DashboardLayout>
  );
}

export default TsunamiRunups;
