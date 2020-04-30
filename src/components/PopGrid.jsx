import React, { useRef, useEffect, useState } from 'react'

import { Canvas, Rect } from '@bucky24/react-canvas'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'


const P_COLORS = {
    S: 'lightgrey',
    i: 'pink',
    I: 'red',
    R: 'green',
    D: 'black',
}

const P_LABELS = {
    S: 'Susceptible',
    i: 'Incubating',
    I: 'Symptomatic',
    R: 'Recovered',
    D: 'Dead',
}

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        margin: 'auto',
        // display: 'flex'
    },
    cellType: {
        textAlign: 'center',
        margin: '10px',
    },
    cellLegend: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    legendBox: {
        padding: '10px',
        border: '2px dashed #333',
        width: '0px',
        margin: '5px auto',
    }
}))

const PopGrid = props => {
    const contElem = useRef()

    const [mousePos, setMousePos] = useState(null)

    let CANVAS_WIDTH = Math.min(800, contElem.current && contElem.current.clientWidth);

    const classes = useStyles()

    const { gridData, stats } = props

    const rowLength = gridData.length
    const cellWidth = Math.floor(CANVAS_WIDTH / rowLength)
    const cellPad = Math.max(0.1 * cellWidth, 2)

    const sideCorrection = 1 * (CANVAS_WIDTH - cellWidth * rowLength)

    const handleMouseMove = ({ x, y }) => {
        setMousePos((x > 0 && y > 0) ? gridData[Math.floor(y / cellWidth)][Math.floor(x / cellWidth)].phase : "Lmao")
    }

    return <div className={classes.root} ref={contElem}>
        <Canvas width={CANVAS_WIDTH - sideCorrection} height={CANVAS_WIDTH - sideCorrection} onMove={handleMouseMove} onMouseOut={() => { console.log("Out!") }}>
            {gridData.map((row, y) => row.map((cell, x) => <Rect key={`cell${x}${y}${cell.phase}`} fill={true} color={P_COLORS[cell.phase]}
                x={x * cellWidth + cellPad} y={y * cellWidth + cellPad} x2={(x + 1) * cellWidth - cellPad} y2={(y + 1) * cellWidth - cellPad} />))}
        </Canvas>
        <div className={classes.cellLegend}>
            {Object.keys(P_COLORS).map((k, i) =>
                <div key={i} >
                    <div className={classes.legendBox} style={{ backgroundColor: P_COLORS[k] }} />
                    <Typography variant="h5">{stats[P_LABELS[k].toLowerCase()]} </Typography>
                    <Typography variant="subtitle2">{P_LABELS[k]}</Typography>
                </div>
            )}
        </div>
        <Typography variant="h5" className={classes.cellType} style={{ color: P_COLORS[mousePos] }}>{P_LABELS[mousePos]}</Typography>
    </div>
}

export default PopGrid