import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { Grid, Typography, Container, Divider } from '@material-ui/core'

import PopGrid from './PopGrid'
import TickControls from './TickControls'

const PHASE = {
    S: 'S',
    I: 'I',
    R: 'R'
}


const createCell = (phase = PHASE.S, ti = null, tr = null) => ({ phase, ti, tr })

const createGrid = (size) => {
    // const seed = (x, y) => ((Math.floor(size / 3) == x) && (Math.floor(size / 3) == y)) ? PHASE.I : PHASE.S
    return _.chunk(_.map(Array(size * size), (x, i) => createCell(i == Math.floor(size * size / 2) ? PHASE.I : PHASE.S)), size)
}

const Simulator = props => {
    const SIZE = 35

    const [grid, setGrid] = useState(createGrid(SIZE))
    const [tick, setTick] = useState(0)
    const [isRunning, setRunning] = useState(false)

    let tickerID = useRef()
    let lastUpdate = useRef()

    const iterTick = () => {
        console.log("Frame++");
        if ((Date.now() - lastUpdate.current) > 500) {
            setTick(tick => tick + 1)
            // console.log("iterated!", Date.now() - lastUpdate);
            lastUpdate.current = Date.now()
        }
        tickerID.current = requestAnimationFrame(iterTick)
    }

    useEffect(() => {
        console.log("IsRunning is now :", isRunning);
        if (isRunning) {
            lastUpdate.current = Date.now()
            tickerID.current = requestAnimationFrame(iterTick)
        } else {
            cancelAnimationFrame(tickerID.current)
        }
    }, [isRunning])

    const start = () => { setRunning(true) }
    const pause = () => { setRunning(false) }
    const reset = () => { setRunning(false); setTick(0); setGrid(createGrid(SIZE)) }

    return <Container>
        <Typography variant="h6">Pandemic Simulator</Typography>
        <PopGrid gridData={grid} />
        <TickControls tick={tick} isRunning={isRunning} start={start} reset={reset} pause={pause} />
        <Divider />
        {/* {JSON.stringify(grid)} */}
    </Container>
}

export default Simulator