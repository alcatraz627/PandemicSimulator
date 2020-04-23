import React, { useRef, useEffect } from 'react'

import { Canvas, Rect } from '@bucky24/react-canvas'

import { makeStyles } from '@material-ui/core/styles'


const P_COLORS = {
    S: 'lightgrey',
    i: 'pink',
    I: 'red',
    R: 'grey',
    D: 'purple',
}

const useStyles = makeStyles(theme => ({
    root: {
        // border: '1px dotted red',
        textAlign: 'auto',
        margin: 'auto',
        display: 'flex'
    }
}))

const PopGrid = props => {
    const contElem = useRef()

    let CANVAS_WIDTH = Math.min(700, contElem.current && contElem.current.clientWidth);

    const classes = useStyles()

    const { gridData } = props

    const rowLength = gridData.length
    const cellWidth = Math.floor(CANVAS_WIDTH / rowLength)
    const cellPad = Math.max(0.1 * cellWidth, 2)

    const sideCorrection = 1 * (CANVAS_WIDTH - cellWidth * rowLength)


    return <div className={classes.root} ref={contElem}>
        <Canvas width={CANVAS_WIDTH - sideCorrection} height={CANVAS_WIDTH - sideCorrection}>
            {/* <Rect x={0} y={0} x2={600} y2={600} fill={true} color="blue" /> */}
            {gridData.map((row, y) => row.map((cell, x) => <Rect key={`cell${x}${y}${cell.phase}`} fill={true} color={P_COLORS[cell.phase]}
                x={x * cellWidth + cellPad} y={y * cellWidth + cellPad} x2={(x + 1) * cellWidth - cellPad} y2={(y + 1) * cellWidth - cellPad} />))}


        </Canvas>
    </div>
}

export default PopGrid