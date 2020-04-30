import React from 'react'

import { Slider, Typography, Button, Divider, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'


const useStyles = makeStyles(theme => ({
    root: {
        // border: '1px dotted red',
        margin: 'auto',
        // padding: '30px 20px'
    },
    sliderBox: {
        // margin: '20px 0',
        padding: '20px',
        border: '1px solid lightgrey',
        borderRadius: '10px',
    },
    resetButton: {
        float: 'right',
        color: purple[500],
        borderColor: purple[500],
    },
    inSection: {
        margin: '10px 0 50px',
    },
}))

const ParamSliders = props => {
    const classes = useStyles()

    const {
        T_inc, setT_inc,
        T_r, setT_r,
        R_naught, setR_naught,
        R_mort, setR_mort,
        D_travel, setD_travel,
        N_init, setN_init,
        P_healthcare, setP_healthcare,
        
        isRunning, tick, 
        resetParams
    } = props


    return <div className={classes.root}>
        <Button className={classes.resetButton} onClick={resetParams} variant="outlined" color="default">Reset Parameters</Button>
        <Typography variant="h5">Set model parameters</Typography>
        <br />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <div className={classes.sliderBox}>
                    <Typography variant="h5">Effect of Human Activities</Typography>

                    <Divider className={classes.inSection} />
                    <Slider valueLabelDisplay="on" value={D_travel} onChange={(e, v) => { setD_travel(v) }}
                        min={1} max={20} marks step={1} />
                    <Typography variant="h6">Average travel radius</Typography>
                    <Typography variant="subtitle1">How far does an infected person travel and create new hotspots</Typography>

                    <Divider className={classes.inSection} />

                    <Slider valueLabelDisplay="on" value={N_init} onChange={(e, v) => { setN_init(v) }}
                        min={1} max={50} marks step={1} disabled={isRunning || tick > 0} />
                    <Typography variant="h6">Initial Infection carriers</Typography>
                    <Typography variant="subtitle1">Number of people in the initial population who are infected infected</Typography>

                    <Divider className={classes.inSection} />
                    <Slider valueLabelDisplay="on" value={P_healthcare} onChange={(e, v) => { setP_healthcare(v) }}
                        min={0.05} max={1} marks step={0.05} disabled={isRunning || tick > 0} />
                    <Typography variant="h6">Capacity of the healthcare system</Typography>
                    <Typography variant="subtitle1">Percentage of the population that the healthcare system can tend to at any given time</Typography>
                </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4}>
                <div className={classes.sliderBox}>
                    <Typography variant="h5">Incubation Period</Typography>

                    <Divider className={classes.inSection} />
                    <Slider valueLabelDisplay="on" value={T_inc} onChange={(e, v) => { setT_inc(v) }}
                        min={1} max={40} marks step={1} />
                    <Typography variant="h6">Days with Symptoms</Typography>
                    <Typography variant="subtitle1">The number of days it takes for symptoms to show</Typography>

                    <Divider className={classes.inSection} />

                    <Slider valueLabelDisplay="on" value={T_r} onChange={(e, v) => { setT_r(v) }}
                        min={1} max={40} marks step={1} />
                    <Typography variant="h6">Recovery period</Typography>
                    <Typography variant="subtitle1">The number of days it usually takes a patient to heal once symptoms show</Typography>
                </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4}>
                <div className={classes.sliderBox}>
                    <Typography variant="h5">Virus Action</Typography>

                    <Divider className={classes.inSection} />
                    <Slider valueLabelDisplay="on" value={R_naught} onChange={(e, v) => { setR_naught(v) }}
                        min={0} max={1} step={0.05} />
                    <Typography variant="h6">Transmission rate</Typography>
                    <Typography variant="subtitle1">R0, The basic reproduction number</Typography>

                    <Divider className={classes.inSection} />

                    <Slider valueLabelDisplay="on" value={R_mort} onChange={(e, v) => { setR_mort(v) }}
                        min={0} max={1} step={0.05} />
                    <Typography variant="h6">Mortality rate</Typography>
                    <Typography variant="subtitle1">How likely is a patient to die</Typography>
                </div>
            </Grid>
        </Grid>
    </div>
}

export default ParamSliders