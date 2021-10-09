import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {Chart as ChartJs} from 'chart.js';

function Chart({ timeSeries }){

    const canvasRef = useRef();
    const chartRef = useRef();

    function drawChart(){
        if(!timeSeries) return;

        const labels = timeSeries.median.map((v, idx) => idx % 12 == 0 ? idx/12 : '');
        const dataMedian = timeSeries.median.map(v => v.y);
        const dataGood = timeSeries.upper95.map(v => v.y);
        const dataBad = timeSeries.lower05.map(v => v.y);

        const data = {
            datasets: [
                {
                    data: dataGood,
                    label: 'Good performance',
                    borderColor: 'rgba(100, 255, 100, 0.2)',
                    fill: false,
                    pointRadius: 0
                },
                {
                    data: dataMedian,
                    label: 'Median performance',
                    borderColor: 'rgba(100, 100, 100, 0.2)',
                    fill: false,
                    pointRadius: 0
                },
                {
                    data: dataBad,
                    label: 'Bad performance',
                    borderColor: 'rgba(255, 100, 100, 0.2)',
                    fill: false,
                    pointRadius: 0
                }
            ],
            labels
        };

        const options = {
            responsive: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Years'
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Valuation (EUR)'
                    }
                }]
            }
        };

        const config = {
            type: 'line',
            data,
            options
        };

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        chartRef.current = new ChartJs(context, config);
    }

    useEffect(() => {
        drawChart()
    }, [timeSeries])

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
            />
        </div>
    );
}

Chart.propTypes = {
    timeSeries: PropTypes.object,
};

export default Chart;
