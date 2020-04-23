import React, { useState } from 'react'
// import _ from 'lodash'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Simulator from './Simulator'

const App = () => {

    return (
        <div className="">
            <AppBar>
                <Toolbar>
                    <Typography variant="h5">Pandemic Simulator 2</Typography>
                </Toolbar>
            </AppBar>
            <div style={{margin: "80px"}} />
            <Simulator />
        </div>
    )
}

export default App