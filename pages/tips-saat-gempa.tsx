import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Greeting from "../components/areas/Greeting";


const useStyles = makeStyles(theme => ({
  }));
  
function TipsSaatGempa() {
  const classes = useStyles();

  return (
    <DashboardLayout
      title="Tips Saat Gempa"      avatarIcon="paw"      avatarIconSet="Ionicons"      avatarUrl="/static/favicon.png">
            <Greeting
                who={"Devi item jelekkkkk"}
                                          />
          </DashboardLayout>
  );
}

export default TipsSaatGempa;
