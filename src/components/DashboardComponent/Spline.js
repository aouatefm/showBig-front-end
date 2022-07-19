import React from 'react';
import ReactApexChart from "react-apexcharts";

class Spline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'sales',
                //data: [31, 40, 28, 51, 42, 109, 100]
                data: props.sales
            }, {
                name: 'products',
                data: props.products
            }],
            options: {
                chart: {
                    //height: 350,
                    type: 'area'
                },
            title: {
                text: 'Daily Product Sales'
            },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'string',
                    categories: props.dates
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
                }],
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },


        };
    }



    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
            </div>
        );
    }
}

export default Spline;