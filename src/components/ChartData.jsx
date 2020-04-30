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
        lineTension: 0.07,
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
            // {
            //     ...commonOptions,
            //     label: 'Recovered',
            //     backgroundColor: '#43a047ee',
            //     borderColor: '#1b5e20',
            //     data: history.map(datum => datum.recovered)
            // },
            {
                ...commonOptions,
                label: 'Symptomatic',
                backgroundColor: '#e5393588',
                borderColor: '#b71c1c',
                data: history.map(datum => datum.symptomatic)
            },
            {
                ...commonOptions,
                label: 'Incubating',
                backgroundColor: '#ff111166',
                borderColor: '#f06292',
                data: history.map(datum => datum.incubating)
            },
            {
                ...commonOptions,
                label: 'Healthy(Susceptible + Recovered)',
                backgroundColor: '#43a04777',
                // backgroundColor: '#29b6f644',
                borderColor: '#616161',
                data: history.map(datum => datum.susceptible + datum.recovered)
            },
        ]
    }), [history])

    const options = {
        aspectRatio: 2,
        responsive: true,
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: "State of the population's health",
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

    // useEffect(() => {
    //     console.log('data be like');
    //     console.log(data());
    //     console.log('and history');
    //     console.log(history);
    // }, [history])


    return <div style={{ margin: '20px 0', maxHeight: '600px' }}>
        <Line responsive data={data} height={300} options={options} />
        {/* {JSON.stringify(data)} */}
    </div>
}

export default ChartData