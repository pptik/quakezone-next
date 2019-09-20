import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as dateFns from "date-fns";

import ItemGridStandard from "../components/areas/ItemGridStandard";


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
  
function Tsunamis() {
  const classes = useStyles();
  // Queries
  const tsunamiEvents = useQuery(gql`
  {
  tsunamiSources2(filter:{limit: 100}) {
    abe
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
    iida
    injuries
    injuriesDescription
    intensitySoloviev
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
  } 
}
  `);
  // Item mappers
  const tsunamiEventsItemMapper = (it: any) => ({
    "title": it.locationName,
    "subheader": it.primaryMagnitude,
    "icon": ("water"),
    "iconBackground": (it.primaryMagnitude >= 7 ? "red" : "silver"),
  });
  

  return (
    <DashboardLayout
      title="Tsunamis"
      avatarIcon="water"
      avatarIconSet="Ionicons"
      avatarUrl="/static/favicon.png">
      {tsunamiEvents.loading && <CircularProgress />}
      {tsunamiEvents.error && 
        <SnackbarContent
        className={clsx(classes.error)}
        aria-describedby="tsunamiEvents-snackbar"
        message={
          <span id="tsunamiEvents-snackbar" className={classes.message}>
            <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
            {tsunamiEvents.error.message}
          </span>
        }
      />}
      {!tsunamiEvents.loading && !tsunamiEvents.error &&       <ItemGridStandard
                        items={tsunamiEvents.data.tsunamiSources2.map(tsunamiEventsItemMapper)}
                                  />}
    </DashboardLayout>
  );
}

export default Tsunamis;
