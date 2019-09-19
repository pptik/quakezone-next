import { Avatar, Card, CardHeader, Grid, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
}));

interface Props {
  items: any[];
  getItemIcon: (item: any) => string | undefined;
  getItemIconColor: (item: any) => string | undefined;
  getItemIconBackground: (item: any) => string | undefined;
  getItemTitle: (item: any) => string | undefined;
  getItemSubheader: (item: any) => string | undefined;
}

const ItemGridStandard: FunctionComponent<Props> =
  ({ items, getItemIcon, getItemIconColor, getItemIconBackground, getItemTitle, getItemSubheader }: Props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {items.map((item: any) => (
        <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader 
            avatar={getItemIcon(item) ? <Avatar style={{color: getItemIconColor(item), background: getItemIconBackground(item)}}>{React.createElement("ion-icon", {name: getItemIcon(item)})}</Avatar> : undefined}
            title={getItemTitle(item)}
            subheader={getItemSubheader(item)}/>
        </Card>
      </Grid>
      ))}
    </Grid>
  );
};

export default ItemGridStandard;
