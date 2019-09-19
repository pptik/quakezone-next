import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


const useStyles = makeStyles(theme => ({
  }));
  
function Tsunamis() {
  const classes = useStyles();

  return (
    <DashboardLayout
      title="Tsunamis"      avatarIcon="water"      avatarIconSet="Ionicons"      avatarUrl="/static/favicon.png">
          </DashboardLayout>
  );
}

export default Tsunamis;
