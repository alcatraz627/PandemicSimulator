import React, { useMemo, useEffect } from 'react'
import { Chart } from 'react-charts'


const ChartData = props => {
    let { history } = props

    const axes = useMemo(() => [
        { primary: true, position: 'bottom', type: 'time' },
        { position: 'left', type: 'linear', stacked: true },
    ], [])

    const series = React.useMemo(() => ({ type: 'area' }), [])

    // let KEYS = history.length ? Object.keys(history) : []
    let KEYS = ['Susceptible', 'Incubating', 'Symptomatic', 'Recovered', 'Dead',]


    const data = useMemo(
        // () => [
        // {
        //     label: 'Series 1',
        //     data: [[1, 10], [2, 11], [3, 15]]
        // },
        () => (history.length == 0) ? [] :
            KEYS.map(k => ({
                label: k,
                data: history.length ? history.map((datum, i) => [i, datum[k.toLowerCase()]]) : []
            })),
        // {
        //     label: 'Infected',
        //     data: history.length ? history.map((datum, i) => [i, datum['infected']]) : []
        // },
        [history]
    )

    useEffect(() => {
        console.log('history');
        console.log(history);
    }, [history])

    // const data = useMemo(() => [
    //     { label: 'susceptible', data: [1, 2] },
    //     { label: 'infected', data: [2, 3] },
    // { label: 'symptomatic', data: [] },
    // { label: 'recovered', data: [] },
    // { label: 'dead', data: [] },
    // ], [])

    return <div style={{ width: '100%', height: '100%' }}>
        <Chart axes={axes} data={data} series={series} tooltip />
        {/* {JSON.stringify(data)} */}
    </div>
}

export default ChartData