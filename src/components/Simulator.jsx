import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { Grid, Typography, Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PopGrid from './PopGrid'
import TickControls from './TickControls'
import ParamSliders from './ParamSliders'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        padding: '100px 5vh 20px'
    }
}))

const PHASE = {
    S: 'S', // Susceptible
    i: 'i', // incubating
    I: 'I', // Infected
    R: 'R', // Recovered
    D: 'D' //Dead
}

const FRAME_RATE = 0

const INITIAL_PARAMS = {
    T_inc: 2, //Incubation Period
    T_r: 3, // Recovery Period
    R_naught: 0.2, // Infection Rate
    R_mort: 0.2, // Mortality Rate,
    D_travel: 3, // Travel radius
}


const createCell = (x, y, phase = PHASE.S, ti = null, tr = null) => ({ x, y, phase, ti, tr })

const createGrid = (size) => {
    // const seed = (x, y) => ((Math.floor(size / 3) == x) && (Math.floor(size / 3) == y)) ? PHASE.I : PHASE.S
    return _.chunk(_.map(Array(size * size), (_GARBAGE_, i) => createCell(i % size, Math.floor(i / size), i == Math.floor(size * size / 2 ) ? PHASE.I : PHASE.S)), size)
}

const isValidCoord = ({ x, y, size }) => (x >= 0) && (y >= 0) && (x < size) && (y < size)

const getNeighbors = (x, y, size) => _.filter([{ x: x - 1, y: y }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x, y: y + 1 }], n => isValidCoord({ ...n, size }))

const Simulator = props => {
    const classes = useStyles()

    const SIZE = 51

    const [grid, setGrid] = useState(createGrid(SIZE))
    const [tick, setTick] = useState(0)
    const [isRunning, setRunning] = useState(false)

    const [T_inc, setT_inc] = useState(INITIAL_PARAMS.T_inc) //Incubation Period
    const [T_r, setT_r] = useState(INITIAL_PARAMS.T_r) // Recovery Period
    const [R_naught, setR_naught] = useState(INITIAL_PARAMS.R_naught) // Infection Rate
    const [R_mort, setR_mort] = useState(INITIAL_PARAMS.R_mort) // Mortality Rate

    const [D_travel, setD_travel] = useState(INITIAL_PARAMS.D_travel) // Mortality Rate

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

            // Make some of them travel to random locations
            _.map(infected, ({ x: cx, y: cy }) => {
                let angle = 2 * Math.PI * Math.random() // A random angle in radians
                let newCoord = {
                    x: Math.floor(cx + Math.cos(angle) * D_travel),
                    y: Math.floor(cy + Math.sin(angle) * D_travel),
                }
                console.log("From", cx, cy, " to ", newCoord, "; >>>", isValidCoord({ ...newCoord, size: SIZE }))
                if (isValidCoord({ ...newCoord, size: SIZE }) && (grid[newCoord.y][newCoord.x].phase == PHASE.S) && (Math.random() < R_naught)) {
                    cellsToInfect.push(grid[newCoord.y][newCoord.x])
                }
            })

            // To infect next
            _.map(infected, c => {
                cellsToInfect = [...cellsToInfect, ...(_.filter(getNeighbors(c.x, c.y, SIZE), ({ x, y }) => (grid[y][x].phase == PHASE.S) && (Math.random() < R_naught)))]
            })

            // To show symptoms
            cellsToShowSymptoms = _.filter(infected, c => (c.phase == PHASE.i) && (c.ti + T_inc <= tick))

            // To remove from the network by either recovery or death
            let cellsToRemove = _.filter(infected, ({ x, y }) => (grid[y][x].ti + T_inc + T_r <= tick))
            _.map(cellsToRemove, c => {
                ((Math.random() > R_mort) ? cellsToRecover : cellsToKill).push(c)
            })


            updateCells(cellsToInfect, PHASE.i)
            updateCells(cellsToShowSymptoms, PHASE.I)
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
        D_travel, setD_travel,
        resetParams: () => {
            setT_inc(INITIAL_PARAMS.T_inc);
            setT_r(INITIAL_PARAMS.T_r);
            setR_naught(INITIAL_PARAMS.R_naught);
            setR_mort(INITIAL_PARAMS.R_mort);
            setD_travel(INITIAL_PARAMS.D_travel);
        }
    }

    return <div className={classes.root}>
        <Grid container>
            <Grid item md={5} xs={12}>
                <Typography variant="h5">Visualization of the population health</Typography>
                <br />
                <PopGrid gridData={grid} />
                <TickControls tick={tick} isRunning={isRunning} start={start} reset={reset} pause={pause} step={step} />
            </Grid>
            <Grid item md={7} xs={12}>
            {/* </Grid>
            <Grid item md={12} xs={12}> */}
                <ParamSliders {...paramSliderParams} />
            </Grid>
        </Grid>
    </div>
}

export default Simulator