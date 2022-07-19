import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts";

class DonutChart extends Component {
    constructor(props) {

        super(props);
        const colors =   new Array(6).fill().map(val => '#'+Math.floor(Math.random()*16777215).toString(16))
        this.state = {
            options: {
                labels: Object.keys(props.stores),
                theme: {
                    monochrome: {
                        enabled: false
                    }
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {width: "100%"},
                            legend: {show: true}
                        }
                    }
                ],
                chart: {
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            console.log(config.w.config.labels[config.dataPointIndex]);
                        }
                    }
                }
            ,
            title: {
                text: 'Sales Per Store'
            },

                // generate random color code for each store
                colors: colors,


            },
            series: Object.values(props.stores)
        };
    }
    render() {
        return (
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    width="500"
                />
        );
    }
}

export default DonutChart;



