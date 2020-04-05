import { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ReactMapGL from "react-map-gl";
import { produce } from 'immer';
import qzStyle from "../../mapbox/style.json";
import { FormControl, InputLabel } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const TextFieldEntry: FunctionComponent<{
  mapboxApiAccessToken: string;
  label: string;
  featurePoint?: any;
  featureLat?: number;
  featureLon?: number;
  featureName?: string;
  [prop: string]: any;
}> = ({ mapboxApiAccessToken, label, featurePoint, featureLat, featureLon, featureName, ...props }) => {
  const classes = useStyles();
  featurePoint = (featurePoint ? featurePoint : { coordinates: [ featureLon, featureLat ], type: "Point" });
  const mapStyle = produce(qzStyle, (it: any) => {
    it.sources = {
      composite: {
        url: "mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2",
        type: "vector"
      },
      earthquakes: {
        type: "geojson",
        data: {
          geometry: featurePoint,
          type: "Feature",
          properties: {
            name: featureName
          }
        }
      }
    };
  });
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: featurePoint.coordinates[1],
    longitude: featurePoint.coordinates[0],
    zoom: 5
  } as any);
  return (
    <FormControl margin="normal">
      <InputLabel shrink={true}>{label}</InputLabel>
      <ReactMapGL
        mapboxApiAccessToken={mapboxApiAccessToken}
        mapStyle={mapStyle}
        style={{ marginTop: "1.5rem" }}
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
      />
    </FormControl>
  );
};

export default TextFieldEntry;
