import React, { useMemo, useEffect } from 'react'
import { Chart } from 'react-charts'


const ChartData = props => {
    let { history } = props

    const axes = useMemo(() => [
        { primary: true, position: 'top', type: 'linear' },
        { position: 'left', type: 'linear', stacked: true },
    ], [])

    let KEYS = ['Susceptible', 'Incubating', 'Symptomatic', 'Recovered', 'Dead',]


    // () => [
    // {
    //     label: 'Series 1',
    //     data: [[1, 10], [2, 11], [3, 15]]
    // },
    // {
    //     label: 'Infected',
    //     data: history.length ? history.map((datum, i) => [i, datum['infected']]) : []
    // },
    const data = useMemo(() => 
    // (history.length == 0) ? [] :
        KEYS.map(k => ({
            label: k,
            data: history.length ? history.map((datum, i) => [i, datum[k.toLowerCase()]]) : []
        })), [history]
    )
    const series = React.useMemo(() => ({ type: 'area', showPoints: false }), [])
    const getSeriesStyle = React.useCallback(() => ({ transition: 'all .5s ease' }), [])
    const getDatumStyle = React.useCallback(() => ({ transition: 'all .5s ease' }), [])

    useEffect(() => {
        console.log('history');
        console.log(history);
    }, [history])


    return <div style={{ width: '90%', height: '70%', margin: '20px', }}>
        <Chart axes={axes} data={data} series={series} getSeriesStyle={getSeriesStyle} getDatumStyle={getDatumStyle} tooltip primaryCursor secondaryCursor />
        {/* {JSON.stringify(data)} */}
    </div>
}

export default ChartData