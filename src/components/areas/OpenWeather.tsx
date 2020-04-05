import { FunctionComponent, useEffect, useState } from "react";
import { Grid, Typography, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Head from "next/head";

const useStyles = makeStyles(theme => ({
    weather: {
        padding: "1rem",
        background: "linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)",
    }
}));

interface Weather {
    weather: [{id: number, main: string, description: string, icon: string}];
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    sys: {
        type: number;
        id: number;
        message: DoubleRange;
        country: string;
        sunrise: number;
        sunset: number;
    };
    name: string;
}

const OpenWeather: FunctionComponent<{ apiKey: string, q: string }> = ({ apiKey, q }) => {
    const [ data, setData ] = useState<Weather>();
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}&units=metric&q=${q}`)
            .then((res: any) => res.json())
            .then((body: any) => {
                console.info(body);
                setData(body);
            });
    }, [q]);

    const classes = useStyles();
    return (
        <Paper className={classes.weather}>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-weather-icons@0.0.8/dist/css/open-weather-icons.css"/>
            </Head>
            <Grid container alignItems="flex-end">
                {!data && <Grid item xs={6}>
                    <CircularProgress />
                </Grid>}
                {data && <Grid item xs={6} style={{color: "darkcyan"}}>
                    <div><i className={`owi owi-${data && data.weather[0].icon}`} style={{fontSize: "3rem"}}></i></div>
                    <h1 style={{marginBottom: 0}}>{data.main.temp.toFixed(1)}°C</h1>
                </Grid>}
                {data && <Grid item xs={6} style={{textAlign: "right", color: "lightcyan"}}>
                    <Typography>{data.weather[0].main}</Typography>
                    <h2 style={{marginBottom: 0}}>{data.name}, {data.sys.country}</h2>
                </Grid>}
            </Grid>
        </Paper>
    );
};

export default OpenWeather;
