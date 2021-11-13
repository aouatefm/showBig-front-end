import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts";

class ComboChart extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                series: [{
                    name: 'Website Blog',
                    type: 'column',
                    data: props.sales
                }, {
                    name: 'Social Media',
                    type: 'line',
                    data: props.products
                    //data: []
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                    },
                    stroke: {
                        width: [0, 4]
                    },
                    title: {
                        text: 'Traffic Sources'
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1]
                    },
                    labels: props.dates,
                    xaxis: {
                        type: 'string'
                    },
                    yaxis: [{
                        title: {
                            text: 'Website Blog',
                        },

                    }, {
                        opposite: true,
                        title: {
                            text: 'Social Media'
                        }
                    }]
                },


            };
    }


    render() {
        return (
            <div>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={350}/>

            </div>
        );
    }
}

export default ComboChart;