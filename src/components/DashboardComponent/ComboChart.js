import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts";

class ComboChart extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                series: [{
                    name: 'Sales',
                    type: 'column',
                    data: props.sales
                }, {
                    name: 'Products',
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
                        text: 'Monthly Product Sales'
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
                            text: 'Sales ($)',
                        },

                    }, {
                        opposite: true,
                        title: {
                            text: 'Number of products'
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