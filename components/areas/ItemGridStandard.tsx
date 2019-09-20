import { Avatar, Card, CardHeader, Grid, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
}));

interface ItemGridStandardItem {
  title?: string;
  subheader?: string;
  icon?: string;
  iconColor?: string;
  itemBackground?: string;
}

interface Props {
  items: ItemGridStandardItem[];
}

const ItemGridStandard: FunctionComponent<Props> = ({ items }: Props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {items.map((item: any, index: number) => (
      <Grid item key={index} xs={12} sm={6} lg={4}>
        <Card style={{height: "100%"}}>
          <CardHeader 
            avatar={item.icon ? 
              <Avatar style={{color: item.iconColor, background: item.iconBackground}}>
                {React.createElement("ion-icon", {name: item.icon})}</Avatar> : undefined}
            title={item.title}
            subheader={item.subheader}/>
        </Card>
      </Grid>
      ))}
    </Grid>
  );
};

export default ItemGridStandard;
