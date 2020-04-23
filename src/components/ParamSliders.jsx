import React from 'react'

import { Slider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        // border: '1px dotted red',
        margin: 'auto',
        padding: '30px 0'
    }
}))

const ParamSliders = props => {
    const classes = useStyles()

    const {
        T_inc, setT_inc,
        T_r, setT_r,
        R_naught, setR_naught,
        R_mort, setR_mort,
    } = props


    return <div className={classes.root}>
        <Typography variant="h5">Set model parameters</Typography>
        <Slider valueLabelDisplay="on" value={T_inc} onChange={(e, v) => { setT_inc(v) }} />
        <Slider valueLabelDisplay="on" value={T_r} onChange={(e, v) => { setT_r(v) }} />
        <Slider valueLabelDisplay="on" value={R_naught} onChange={(e, v) => { setR_naught(v) }} />
        <Slider valueLabelDisplay="on" value={R_mort} onChange={(e, v) => { setR_mort(v) }} />
    </div>
}

export default ParamSliders