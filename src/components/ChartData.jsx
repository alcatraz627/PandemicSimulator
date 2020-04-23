import React, { useMemo, useEffect } from 'react'
import { Line } from 'react-chartjs-2'


const ChartData = props => {
    let { history } = props

    // const axes = useMemo(() => [
    //     { primary: true, position: 'top', type: 'linear' },
    //     { position: 'left', type: 'linear', stacked: true },
    // ], [])

    let KEYS = ['Susceptible', 'Incubating', 'Symptomatic', 'Recovered', 'Dead',]

    const commonOptions = {

        fill: true,
        lineTension: 0.1,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
    }

    const data = React.useCallback(() => ({
        labels: [...Array(history.length).keys()],
        datasets: [
            {
                ...commonOptions,
                label: 'Dead',
                backgroundColor: '#4e342eee',
                // borderColor: 'rgba(75,192,192,1)',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: history.map(datum => datum.dead)
            },
            {
                ...commonOptions,
                label: 'Recovered',
                backgroundColor: '#43a047ee',
                // borderColor: 'rgba(75,192,192,1)',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: history.map(datum => datum.recovered)
            },
            {
                ...commonOptions,
                label: 'Symptomatic',
                backgroundColor: '#e5393588',
                // borderColor: 'rgba(75,192,192,1)',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: history.map(datum => datum.symptomatic)
            },
            {
                ...commonOptions,
                label: 'Incubating',
                backgroundColor: '#9575cdff',
                // borderColor: 'rgba(75,192,192,1)',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: history.map(datum => datum.incubating)
            },
            {
                ...commonOptions,
                label: 'Susceptible',
                // backgroundColor: 'rgba(75,192,192,0.4)',
                backgroundColor: '#29b6f644',
                // borderColor: 'rgba(75,192,192,1)',
                // pointBorderColor: 'rgba(75,192,192,1)',
                // pointBackgroundColor: '#fff',
                // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                // pointHoverBorderColor: 'rgba(220,220,220,1)',
                data: history.map(datum => datum.susceptible)
            },
        ]
    }), [history])

    // const data = useMemo(() =>
    //     // (history.length == 0) ? [] :
    //     KEYS.map(k => ({
    //         label: k,
    //         data: history.length ? history.map((datum, i) => [i, datum[k.toLowerCase()]]) : []
    //     })), [history]
    // )

    const options = {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }

    useEffect(() => {
        console.log('data be like');
        console.log(data());
        console.log('and history');
        console.log(history);
    }, [history])


    return <div style={{ width: '90%', height: '70%', margin: '20px', }}>
        {/* <Chart axes={axes} data={data} series={series} getSeriesStyle={getSeriesStyle} getDatumStyle={getDatumStyle} tooltip primaryCursor secondaryCursor /> */}
        <Line data={data} options={options} />
        {/* {JSON.stringify(data)} */}
    </div>
}

export default ChartData