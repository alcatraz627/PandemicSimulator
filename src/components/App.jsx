import React, { useState } from 'react'
// import _ from 'lodash'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Simulator from './Simulator'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        // secondary: green,
    },
    //   status: {
    //     danger: 'orange',
    //   },
});


const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5">Pandemic Simulator 2</Typography>
                </Toolbar>
            </AppBar>
            <div style={{ margin: "80px" }} />
            <Simulator />
        </ThemeProvider>
    )
}

export default App