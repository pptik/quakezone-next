
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
  
function TsunamiSources() {
  const classes = useStyles();
  // Queries
  const tsunamiSources = useQuery(gql`
  {
  tsunamiSources(orderBy: {sort: "year", direction: desc}, first: 100) {
    edges {
      node {
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
    }
  } 
}`, {
  });
  // Item mappers
  const tsunamiSourcesItemMapper = (it: any) => ({
    "title": (`${it.latitude},${it.longitude} - ${it.locationName} ${it.year}-${it.month}-${it.day}`),
    "subheader": it.primaryMagnitude,
    "icon": ("water"),
    "iconBackground": (it.primaryMagnitude >= 7 ? "red" : "silver"),
    "linkTo": (`/tsunami-sources/${it.id}`),
  });
  
  return (
    <DashboardLayout
      title="Tsunami Sources"
      avatarIcon="water"
      avatarIconSet="Ionicons"
      avatarUrl="/favicon.png">
          {tsunamiSources.loading && <CircularProgress />}
    {tsunamiSources.error && 
      <SnackbarContent
      className={clsx(classes.error)}
      aria-describedby="tsunamiSources-snackbar"
      message={
        <span id="tsunamiSources-snackbar" className={classes.message}>
          <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
          {tsunamiSources.error.message}
        </span>
      }
    />}
    {!tsunamiSources.loading && !tsunamiSources.error &&     <ItemGridStandard
      items={tsunamiSources.data.tsunamiSources.edges.map((it: any) => it.node).map(tsunamiSourcesItemMapper)}
>
        </ItemGridStandard>
        }

    </DashboardLayout>
  );
}

export default TsunamiSources;
