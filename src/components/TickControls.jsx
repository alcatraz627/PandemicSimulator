import React from 'react'

import { Fab, Button, Typography, Divider, Tooltip, Zoom } from '@material-ui/core'
import { Pause, PlayArrow, RotateRight, LastPage } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'

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
    },
    btnFwd: {
        backgroundColor: purple[500],
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: purple[800],
        }
    },
    textRunning: {
        color: theme.palette.success.dark
    },
    textPaused: {
        color: theme.palette.info.dark
    }
}))

const TickControls = props => {
    const { tick, isRunning, start, pause, reset, step } = props
    const classes = useStyles()

    return <div className={classes.root}>
        <div className={classes[isRunning ? 'textRunning' : 'textPaused']}>

            <Typography variant="h5">Day {tick + 1}</Typography>
            <Typography variant="button">{isRunning ? "Running" : "Stopped"}</Typography>
        </div>
        <div className={classes.btnGrp}>
            <Tooltip TransitionComponent={Zoom} arrow title="Pause"><span><Fab className={classes.btn} onClick={pause} color="primary" disabled={!isRunning}><Pause /></Fab></span></Tooltip>
            <Tooltip TransitionComponent={Zoom} arrow title="Start"><span><Fab className={classes.btn} onClick={start} color="primary" disabled={isRunning}><PlayArrow /></Fab></span></Tooltip>
            <Tooltip TransitionComponent={Zoom} arrow title="Step"><span><Fab className={`${classes.btn} ${classes.btnFwd}`} onClick={step} disabled={isRunning} color="default" ><LastPage /></Fab></span></Tooltip>
            <Tooltip TransitionComponent={Zoom} arrow title="Reload"><span><Fab className={classes.btn} onClick={reset} color="secondary" disabled={tick == 0}><RotateRight /></Fab></span></Tooltip>
        </div>

    </div>
}

export default TickControls