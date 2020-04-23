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


const createCell = (x, y, phase = PHASE.S, ti = null, tr = null) => ({ x, y, phase, ti, tr })

const createGrid = (size) => {
    // const seed = (x, y) => ((Math.floor(size / 3) == x) && (Math.floor(size / 3) == y)) ? PHASE.I : PHASE.S
    return _.chunk(_.map(Array(size * size), (_GARBAGE_, i) => createCell(i % size, Math.floor(i / size), i == Math.floor(size * size / 2) ? PHASE.I : PHASE.S)), size)
}

const getNeighbors = (x, y) => ([{ x: x - 1, y: y }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x, y: y + 1 }])

const Simulator = props => {
    const SIZE = 7

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
        if (tick > 0) {
            const infected = _.filter(_.flatten(grid), c => (c.phase == PHASE.I));
            console.log(infected);
            // _.map(infected, c => {
            // const neighbors = getNeighbors(c.x, c.y)

            // })

        } else {
            setGrid(createGrid(SIZE))
        }
    }, [tick])

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
    const reset = () => { setRunning(false); setTick(0) }
    const step = () => { setTick(tick => tick + 1) }

    return <Container>
        <Typography variant="h6">Pandemic Simulator</Typography>
        <PopGrid gridData={grid} />
        <TickControls tick={tick} isRunning={isRunning} start={start} reset={reset} pause={pause} step={step}/>
        <Divider />
        {JSON.stringify(grid)}
    </Container>
}

export default Simulator