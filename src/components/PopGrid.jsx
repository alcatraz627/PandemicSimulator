import React from 'react'

import { Canvas, Rect } from '@bucky24/react-canvas'

import { makeStyles } from '@material-ui/core/styles'

const CANVAS_WIDTH = 600;

const P_COLORS = {
    S: 'lightgrey',
    i: 'pink',
    I: 'red',
    R: 'grey',
    D: 'purple',
}

const useStyles = makeStyles(theme => ({
    container: {
        border: '1px dotted red',
        display: 'inline-block',
        margin: 'auto'
    }
}))

const PopGrid = props => {
    const classes = useStyles()

    const { gridData } = props


    const rowLength = gridData.length
    const cellWidth = Math.floor(CANVAS_WIDTH / rowLength)
    const cellPad = (0.1 * cellWidth)


    return <div className={classes.container}>
        <Canvas width={CANVAS_WIDTH} height={CANVAS_WIDTH}>
            {gridData.map((row, y) => row.map((cell, x) => <Rect key={`cell${x}${y}`} fill={true} color={P_COLORS[cell.phase]}
                x={x * cellWidth + cellPad} y={y * cellWidth + cellPad} x2={(x + 1) * cellWidth - cellPad} y2={(y + 1) * cellWidth - cellPad} />))}


        </Canvas>
    </div>
}

export default PopGrid