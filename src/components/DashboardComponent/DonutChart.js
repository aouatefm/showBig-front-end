import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts";

class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                labels: ["Apple", "Mango", "Orange", "Watermelon"],
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
                            legend: {show: false}
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
            },
            series: [44, 55, 13, 43, 22]
        };
    }
    render() {
        return (
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    width="400"
                />
        );
    }
}

export default DonutChart;