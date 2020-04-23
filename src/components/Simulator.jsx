import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Grid, Typography, Container, Divider } from '@material-ui/core'
import PopGrid from './PopGrid'

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
    const SIZE = 9
    const [grid, setGrid] = useState(createGrid(SIZE))


    return <Container>
        <Typography variant="h6">Pandemic Simulator</Typography>
        <PopGrid gridData={grid} />
        <Divider />
        {JSON.stringify(grid)}
    </Container>
}

export default Simulator