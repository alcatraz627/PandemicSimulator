import React from 'react'

import { Fab, Button, Typography, Divider } from '@material-ui/core'
import { Pause, PlayArrow, RotateRight, LastPage } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '30px 0',
        textAlign: 'center',
        maxWidth: '600px',
        // border: '1px dotted blue'
    },
    btnGrp: {
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'center',
    },
    btn: {
        margin: '0 15px'
    }
}))

const TickControls = props => {
    const { tick, isRunning, start, pause, reset, step } = props
    const classes = useStyles()

    return <div className={classes.root}>
        <Typography variant="h5">Day {tick + 1}</Typography>
        <Typography variant="button">{isRunning ? "Running" : "Stopped"}</Typography>
        <Divider />
        <div className={classes.btnGrp}>
            <Fab className={classes.btn} onClick={pause} color="primary" disabled={!isRunning}><Pause /></Fab>
            <Fab className={classes.btn} onClick={start} color="primary" disabled={isRunning}><PlayArrow /></Fab>
            <Fab className={classes.btn} onClick={step} color="default" disabled={isRunning}><LastPage /></Fab>
            <Fab className={classes.btn} onClick={reset} color="secondary" disabled={tick == 0}><RotateRight /></Fab>
        </div>

    </div>
}

export default TickControls