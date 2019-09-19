import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ItemGridStandard from "../components/areas/ItemGridStandard";


const useStyles = makeStyles(theme => ({
  }));
  
function Quakes() {
  const classes = useStyles();
  const quakes = useQuery(gql`
  {
  quakes2 {
    id, mw, name, noaaLocation, noaaTsunami, originTime
  } 
}

  `);

  return (
    <DashboardLayout
      title="Earthquakes"      avatarIcon="wifi"      avatarIconSet="Ionicons"      avatarUrl="/static/favicon.png">
            <ItemGridStandard
                        items={(quakes.data && quakes.data.quakes2) || []}
                        getItemIconColor={it => undefined}
                        getItemIcon={it => it.noaaTsunami ? 'water' : 'wifi'}
                getItemIconBackground={it => it.mw >= 7 ? 'red' : 'silver'}
                getItemSubheader={it => it.originTime}
                getItemTitle={it => it.name}
                  />
          </DashboardLayout>
  );
}

export default Quakes;
