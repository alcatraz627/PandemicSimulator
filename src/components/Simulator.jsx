import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { Grid, Typography, Container, Divider } from '@material-ui/core'

import PopGrid from './PopGrid'
import TickControls from './TickControls'
import ParamSliders from './ParamSliders'

const PHASE = {
    S: 'S', // Susceptible
    i: 'i', // incubating
    I: 'I', // Infected
    R: 'R', // Recovered
    D: 'D' //Dead
}

const FRAME_RATE = 0


const createCell = (x, y, phase = PHASE.S, ti = null, tr = null) => ({ x, y, phase, ti, tr })

const createGrid = (size) => {
    // const seed = (x, y) => ((Math.floor(size / 3) == x) && (Math.floor(size / 3) == y)) ? PHASE.I : PHASE.S
    return _.chunk(_.map(Array(size * size), (_GARBAGE_, i) => createCell(i % size, Math.floor(i / size), i == Math.floor(size * size / 2) ? PHASE.I : PHASE.S)), size)
}

const getNeighbors = (x, y, size) => _.filter(
    [{ x: x - 1, y: y }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x, y: y + 1 }],
    ({ x, y }) => (x >= 0) && (y >= 0) && (x < size) && (y < size))

const Simulator = props => {
    const SIZE = 31

    const [grid, setGrid] = useState(createGrid(SIZE))
    const [tick, setTick] = useState(0)
    const [isRunning, setRunning] = useState(false)

    const [T_inc, setT_inc] = useState(2) //Incubation Period
    const [T_r, setT_r] = useState(3) // Recovery Period
    const [R_naught, setR_naught] = useState(0.2) // Infection Rate
    const [R_mort, setR_mort] = useState(0.2) // Mortality Rate

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
        if ((Date.now() - lastUpdate.current) > FRAME_RATE) {
            setTick(tick => tick + 1)
            // console.log("iterated!", Date.now() - lastUpdate);
            lastUpdate.current = Date.now()
        }
        tickerID.current = requestAnimationFrame(iterTick)
    }

    useEffect(() => {
        if (tick > 0) {

            const infected = _.filter(_.flatten(grid), c => ((c.phase == PHASE.I) || (c.phase == PHASE.i)));
            // const infected = _.filter(_.flatten(grid), c => (c.phase == PHASE.I));
            // if (infected.length == SIZE * SIZE) { pause(); return } //Check if final 

            let cellsToInfect = [],
                cellsToShowSymptoms = [],
                cellsToRecover = [],
                cellsToKill = []

            // To infect next
            _.map(infected, c => {
                cellsToInfect = [...cellsToInfect, ...(_.filter(getNeighbors(c.x, c.y, SIZE), ({ x, y }) => (grid[y][x].phase == PHASE.S) && (Math.random() < R_naught)))]
            })
            updateCells(cellsToInfect, PHASE.i)

            // To show symptoms
            cellsToShowSymptoms = _.filter(infected, c => (c.phase == PHASE.i) && (c.ti + T_inc <= tick))
            updateCells(cellsToShowSymptoms, PHASE.I)

            // To remove from the network by either recovery or death
            let cellsToRemove = _.filter(infected, ({ x, y }) => (grid[y][x].ti + T_r <= tick))
            _.map(cellsToRemove, c => {
                ((Math.random() > R_mort) ? cellsToRecover : cellsToKill).push(c)
            })
            updateCells(cellsToRecover, PHASE.R)
            updateCells(cellsToKill, PHASE.D)



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

    const paramSliderParams = {
        T_inc, setT_inc,
        T_r, setT_r,
        R_naught, setR_naught,
        R_mort, setR_mort,
    }

    return <Container>
        <Grid container>
            <Grid item md={6} xs={12}>
                <Typography variant="h5">Visualization of the population health</Typography>
                <br />
                <PopGrid gridData={grid} />
                <TickControls tick={tick} isRunning={isRunning} start={start} reset={reset} pause={pause} step={step} />
            </Grid>
            <Grid item md={6} xs={12}>
                <ParamSliders {...paramSliderParams} />
            </Grid>
        </Grid>
    </Container>
}

export default Simulator