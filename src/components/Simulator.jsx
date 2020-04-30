import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { Grid, Typography, Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PopGrid from './PopGrid'
import TickControls from './TickControls'
import ParamSliders from './ParamSliders'
import ChartData from './ChartData'

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
    T_inc: 4, //Incubation Period
    T_r: 6, // Recovery Period
    R_naught: 0.2, // Infection Rate
    R_mort: 0.2, // Mortality Rate,
    D_travel: 5, // Travel radius
    N_init: 3, // Count of initial population affected
}


const createCell = (x, y, phase = PHASE.S, ti = null, tr = null) => ({ x, y, phase, ti, tr })

const createGrid = (size, N_init) => {
    // const seed = (x, y) => ((Math.floor(size / 3) == x) && (Math.floor(size / 3) == y)) ? PHASE.I : PHASE.S
    // const seed = (x, y) => (i == Math.floor(size * size / 2))
    const seed = _.map(Array(N_init), (x, j) => Math.floor(size * size * Math.random())) // To formulate how will the initial population be infected. // TODO: Add predefined modes 
    // console.log(seed);
    return _.chunk(_.map(Array(size * size), (_GARBAGE_, i) => createCell(i % size, Math.floor(i / size), seed.includes(i) ? PHASE.I : PHASE.S)), size)
}

const isValidCoord = ({ x, y, size }) => (x >= 0) && (y >= 0) && (x < size) && (y < size)

const getNeighbors = (x, y, size) => _.filter([{ x: x - 1, y: y }, { x: x, y: y - 1 }, { x: x + 1, y: y }, { x: x, y: y + 1 }], n => isValidCoord({ ...n, size }))

const createHistorySlice = ({ susceptible = 0, incubating = 0, symptomatic = 0, recovered = 0, dead = 0 }) => ({ susceptible, incubating, symptomatic, recovered, dead })


const Simulator = props => {
    const classes = useStyles()

    const SIZE = Math.min(91, Math.max(5, window.location.search.split("=")[1])) || 81

    const [grid, setGrid] = useState(createGrid(SIZE, INITIAL_PARAMS.N_init))
    const [tick, setTick] = useState(0)
    const [isRunning, setRunning] = useState(false)

    const [T_inc, setT_inc] = useState(INITIAL_PARAMS.T_inc) //Incubation Period
    const [T_r, setT_r] = useState(INITIAL_PARAMS.T_r) // Recovery Period
    const [R_naught, setR_naught] = useState(INITIAL_PARAMS.R_naught) // Infection Rate
    const [R_mort, setR_mort] = useState(INITIAL_PARAMS.R_mort) // Mortality Rate
    const [D_travel, setD_travel] = useState(INITIAL_PARAMS.D_travel) // Mortality Rate
    const [N_init, setN_init] = useState(INITIAL_PARAMS.N_init) // Count of initial pop infected

    const [history, setHistory] = useState([createHistorySlice({ susceptible: SIZE * SIZE })])

    const updateCells = (batch, phase) => {
        setGrid(grid => {
            let newGrid = _.cloneDeep(grid)
            _.map(batch, ({ x, y }) => {
                newGrid[y][x].phase = phase
                newGrid[y][x].ti = tick
            })
            return newGrid;
        })
    }

    let tickerID = useRef()
    let lastUpdate = useRef()

    const iterTick = () => {
        if ((Date.now() - lastUpdate.current) > FRAME_RATE) {
            setTick(tick => tick + 1)
            lastUpdate.current = Date.now()
        }
        tickerID.current = requestAnimationFrame(iterTick)
    }

    useEffect(() => {
        if (tick > 0) {
            const infected = _.filter(_.flatten(grid), c => ((c.phase == PHASE.I) || (c.phase == PHASE.i)));
            // if (history.length > 3 && _.isEqual(history[history.length - 1], history[history.length - 3])) { pause(); return }

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
                if (isValidCoord({ ...newCoord, size: SIZE }) && (grid[newCoord.y][newCoord.x].phase == PHASE.S) && (Math.random() < R_naught)) {
                    cellsToInfect.push(grid[newCoord.y][newCoord.x])
                }
            })

            // To infect next
            _.map(infected, c => {
                cellsToInfect = [...cellsToInfect, ...(_.filter(getNeighbors(c.x, c.y, SIZE), ({ x, y }) => (grid[y][x].phase == PHASE.S) && (Math.random() < (R_naught / ((c.phase == PHASE.i) ? 1 : 2)))))]
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

            setGrid(gridUpdated => {
                // Log an entry
                setHistory(history => [...history, createHistorySlice({
                    susceptible: _.filter(_.flatten(gridUpdated), c => (c.phase == PHASE.S)).length,
                    incubating: _.filter(_.flatten(gridUpdated), c => c.phase == PHASE.i).length,
                    symptomatic: _.filter(_.flatten(gridUpdated), c => c.phase == PHASE.I).length,
                    recovered: _.filter(_.flatten(gridUpdated), c => (c.phase == PHASE.R)).length,
                    dead: _.filter(_.flatten(gridUpdated), c => (c.phase == PHASE.D)).length,
                })])
                return gridUpdated
            })


        } else {
            setGrid(createGrid(SIZE, N_init))
            setHistory([createHistorySlice({ susceptible: SIZE * SIZE })])
        }
    }, [tick])

    useEffect(() => {
        if (isRunning) {
            lastUpdate.current = Date.now()
            tickerID.current = requestAnimationFrame(iterTick)
        } else {
            cancelAnimationFrame(tickerID.current)
        }
    }, [isRunning])

    useEffect(() => {
        if ((tick == 0) && !isRunning) setGrid(createGrid(SIZE, N_init))
    }, [N_init])

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
        N_init, setN_init,
        isRunning, tick,
        history,
        resetParams: () => {
            setT_inc(INITIAL_PARAMS.T_inc);
            setT_r(INITIAL_PARAMS.T_r);
            setR_naught(INITIAL_PARAMS.R_naught);
            setR_mort(INITIAL_PARAMS.R_mort);
            setD_travel(INITIAL_PARAMS.D_travel);
            setN_init(INITIAL_PARAMS.N_init);
        },
    }

    return <div className={classes.root}>
        <Grid container>
            <Grid item lg={6} xs={12} style={{ textAlign: 'justify' }}>
                <Typography variant="h4">Visualization of the population state</Typography><br />
                <Typography variant="body1">The grid below is an abstract model representing a community where people travel around and interact with each other.
                The state of infection of each individual is denoted by different colors as shown below the grid. The controls below the grid allow for starting, pausing, resetting and stepping through the simulation. One tick corresponds to one day.
                </Typography>
                <br />
                <PopGrid gridData={grid} stats={history[history.length - 1]} />
                <TickControls tick={tick} isRunning={isRunning} start={start} reset={reset} pause={pause} step={step} />
            </Grid>
            <Grid item lg={6} xs={12}>
                <ChartData history={history} />
            </Grid>
            <Grid item md={12} xs={12}>
                <ParamSliders {...paramSliderParams} />
            </Grid>
        </Grid>
    </div>
}

export default Simulator