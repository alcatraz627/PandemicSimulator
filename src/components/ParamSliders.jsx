import React from 'react'

import { Slider, Typography, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    root: {
        // border: '1px dotted red',
        margin: 'auto',
        // padding: '30px 20px'
    },
    sliderBox: {
        margin: '20px 0',
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
        resetParams
    } = props


    return <div className={classes.root}>
        <Button className={classes.resetButton} onClick={resetParams} variant="outlined" color="default">Reset Parameters</Button>
        <Typography variant="h5">Set model parameters</Typography>

        <div className={classes.sliderBox}>
            <Typography variant="h5">Incubation Period</Typography>
            <Typography variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe alias veniam quaerat eum sequi totam architecto ea consequuntur! Sequi laboriosam expedita sint vel, reiciendis perspiciatis nihil cupiditate distinctio soluta. Voluptate!</Typography>

            <Divider className={classes.inSection} />
            <Slider valueLabelDisplay="on" value={T_inc} onChange={(e, v) => { setT_inc(v) }}
                min={1} max={40} marks step={1} />
            <Typography variant="h6">Days with Symptoms</Typography>
            <Typography variant="subtitle1">The number of days it takes for symptoms to show</Typography>

            <Divider className={classes.inSection} />

            <Slider valueLabelDisplay="on" value={T_r} onChange={(e, v) => { setT_r(v) }}
                min={1} max={40} marks step={1} />
            <Typography variant="h6">Recovery period</Typography>
            <Typography variant="subtitle1">The number of days it usually takes a patient to heal</Typography>
        </div>

        <div className={classes.sliderBox}>
            <Typography variant="h5">Incubation Period</Typography>
            <Typography variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe alias veniam quaerat eum sequi totam architecto ea consequuntur! Sequi laboriosam expedita sint vel, reiciendis perspiciatis nihil cupiditate distinctio soluta. Voluptate!</Typography>

            <Divider className={classes.inSection} />
            <Slider valueLabelDisplay="on" value={R_naught} onChange={(e, v) => { setR_naught(v) }}
                min={0} max={1} marks step={0.05} />
            <Typography variant="h6">Transmission rate</Typography>
            <Typography variant="subtitle1">R0, The basic reproduction number</Typography>

            <Divider className={classes.inSection} />

            <Slider valueLabelDisplay="on" value={R_mort} onChange={(e, v) => { setR_mort(v) }}
                min={0} max={1} marks step={0.05} />
            <Typography variant="h6">Mortality rate</Typography>
            <Typography variant="subtitle1">How likely is a patient to die</Typography>
        </div>
    </div>
}

export default ParamSliders