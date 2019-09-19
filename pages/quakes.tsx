import clsx from "clsx";
import DashboardLayout from "../components/DashboardLayout";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import ItemGridStandard from "../components/areas/ItemGridStandard";


const useStyles = makeStyles(theme => ({
  }));
  
function Quakes() {
  const classes = useStyles();

  return (
    <DashboardLayout avatarUrl="/static/favicon.png">
            <ItemGridStandard
                items={["saya","suka","situ"]}
                                getItemIcon={it => "heart"}
                getItemIconBackground={it => "red"}
                getItemIconColor={it => undefined}
                getItemSubheader={it => "Aduh"}
                        getItemTitle={it => it}
                  />
          </DashboardLayout>
  );
}

export default Quakes;
