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

const getNeighbors = (x, y, size) => _.filter(
    [{ x: x - 1, y: y }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x, y: y + 1 }],
    ({ x, y }) => (x >= 0) && (y >= 0) && (x < size) && (y < size))

const Simulator = props => {
    const SIZE = 11

    const [grid, setGrid] = useState(createGrid(SIZE))
    const [tick, setTick] = useState(0)
    const [isRunning, setRunning] = useState(false)

    const [tr, setTr] = useState(2)

    const updateCells = (batch, phase) => {
        // let newGrid = Object.assign([], grid)
        // console.log("To Update: ", batch);
        setGrid(grid => {
            let newGrid = _.cloneDeep(grid)
            _.map(batch, ({ x, y }) => {
                // console.log(`Upd ${x}, ${y} to ${phase}`);
                newGrid[y][x].phase = phase
                newGrid[y][x].ti = tick
            })
            return newGrid;
        })
    }

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
            // const infected = _.filter(_.flatten(grid), c => (c.phase == PHASE.I));
            // if (infected.length == SIZE * SIZE) { pause(); return } //Check if final 

            let cellsToInfect = [], cellsToRecover = []

            // To infect next
            _.map(infected, c => {
                cellsToInfect = [...cellsToInfect, ...(_.filter(getNeighbors(c.x, c.y, SIZE), ({ x, y }) => grid[y][x].phase == PHASE.S))]
            })
            updateCells(cellsToInfect, PHASE.I)

            // To recover
            cellsToRecover = _.filter(infected, ({ x, y }) => (grid[y][x].ti + tr <= tick))
            // _.map(infected, c => {
            //     console.log(c.ti + tr <= tick);
            // })
            // //     cellsToRecover = [...cellsToRecover, 

            // //         // ...(_.filter(getNeighbors(c.x, c.y, SIZE), ({ x, y }) => grid[y][x].phase == PHASE.S))
            // //     ]
            updateCells(cellsToRecover, PHASE.R)



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
        <TickControls tick={tick} isRunning={isRunning} start={start} reset={reset} pause={pause} step={step} />
        <Divider />
        {JSON.stringify(grid)}
    </Container>
}

export default Simulator