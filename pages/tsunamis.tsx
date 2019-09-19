import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper,
  CircularProgress, SnackbarContent } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
  const tsunamiEvents = useQuery(gql`
  {
  quakes2 {
    id, mw, name, noaaLocation, noaaTsunami, originTime
  } 
}

  `);

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
      {!tsunamiEvents.loading && !tsunamiEvents.error && <ItemGridStandard
                        items={(tsunamiEvents.data && tsunamiEvents.data.quakes2) || []}
                        getItemIconColor={it => undefined}
                        getItemIcon={it => it.noaaTsunami ? 'water' : 'wifi'}
                getItemIconBackground={it => it.mw >= 7 ? 'red' : 'silver'}
                getItemSubheader={it => it.originTime}
                getItemTitle={it => it.name}
                  />}
    </DashboardLayout>
  );
}

export default Tsunamis;
