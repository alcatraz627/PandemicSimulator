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
        lineTension: 0.02,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'bevel',
        borderWidth: 1,
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        // showLine:  false,
    }

    const data = React.useCallback(() => ({
        labels: [...Array(history.length).keys()],
        datasets: [
            {
                ...commonOptions,
                label: 'Dead',
                backgroundColor: '#4e342eee',
                borderColor: '#333',
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
                borderColor: '#1b5e20',
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
                borderColor: '#b71c1c',
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
                borderColor: '#f06292',
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
                borderColor: '#616161',
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
        aspectRatio: 3,
        // maintainAspectRatio: false,
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: "State of the populations's health",
            fontSize: '20',
        },
        scales: {

            yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: "Population"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Time",
                }
            }],
        }
    }

    useEffect(() => {
        console.log('data be like');
        console.log(data());
        console.log('and history');
        console.log(history);
    }, [history])


    return <div style={{ margin: '20px', }}>
        {/* <Chart axes={axes} data={data} series={series} getSeriesStyle={getSeriesStyle} getDatumStyle={getDatumStyle} tooltip primaryCursor secondaryCursor /> */}
        <Line responsive data={data} height={220} options={options} />
        {/* {JSON.stringify(data)} */}
    </div>
}

export default ChartData