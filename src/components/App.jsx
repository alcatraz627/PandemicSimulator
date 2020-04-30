import React, { useState } from 'react'
// import _ from 'lodash'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Simulator from './Simulator'
import Writeup from './Writeup'

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});


const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5">Pandemic Simulator</Typography>
                    <div style={{flexGrow: 1}} />
                    <Typography variant="button">Created by Team H GN6002 Let's Play To Learn  </Typography>
                </Toolbar>
            </AppBar>
            <Simulator />
            <Writeup />
        </ThemeProvider>
    )
}

export default App